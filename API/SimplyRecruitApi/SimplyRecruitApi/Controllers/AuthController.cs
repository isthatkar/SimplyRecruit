using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static SimplyRecruitAPI.Auth.AuthDtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Auth;
using Google.Apis.Auth;

namespace SimplyRecruitAPI.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly string[] NordDomains = { "@nordsec.com", "@tesonet.com", "@surfshark.com" };
        private UserManager<SimplyUser> _userManager;
        private IJwtTokenService _jwtTokenService;
        private IConfiguration _configuration;

        public AuthController(
            UserManager<SimplyUser> userManager,
            IJwtTokenService jwftTokenService,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _jwtTokenService = jwftTokenService;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("googlelogin")]
        public async Task<IActionResult> GoogleLogin(GoogleLoginDto googleLoginDto)
        {
            GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(googleLoginDto.AccessToken);

            var user = await _userManager.FindByEmailAsync(payload.Email);
            if (user != null)
            {
                return Ok(await LoginUser(user));
            }

            bool isNordEmployee = IsNordDomain(payload.Email);
            var newUser = new SimplyUser()
            {
                Email = payload.Email,
                UserName = $"{payload.FamilyName}{payload.GivenName}"
            };

            var createUserResult = await _userManager.CreateAsync(newUser);
            if (!createUserResult.Succeeded)
                return BadRequest($"Could not create a user. Error: {createUserResult.Errors}");

            await _userManager.AddToRoleAsync(newUser, isNordEmployee ? Roles.Employee : Roles.Candidate);

            return Ok(await LoginUser(newUser));
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(TokenDto tokenModel)
        {
            if (tokenModel is null)
            {
                return BadRequest("Invalid client request");
            }

            string? accessToken = tokenModel.AccessToken;
            string? refreshToken = tokenModel.RefreshToken;

            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            string username = principal.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);
            var roles = await _userManager.GetRolesAsync(user);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            var newAccessToken = _jwtTokenService.CreateAccessToken(username, user.Id, roles);
            var newRefreshToken = _jwtTokenService.CreateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _userManager.UpdateAsync(user);

            var allRoles = string.Empty;
            foreach (string role in roles)
            {
                allRoles += role;
            }
            return Ok(new SuccessfulLoginDto(newAccessToken, newRefreshToken, allRoles, user.Id, user.Email));
        }

        [Authorize]
        [HttpPost]
        [Route("revoke/{id}")]
        public async Task<IActionResult> Revoke(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return BadRequest("Invalid email");

            user.RefreshToken = null;

            await _userManager.UpdateAsync(user);

            return NoContent();
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

        private async Task<SuccessfulLoginDto> LoginUser(SimplyUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtTokenService.CreateAccessToken(user.Email, user.Id, roles);
            var refreshToken = _jwtTokenService.CreateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

            await _userManager.UpdateAsync(user);

            var allRoles = string.Empty;
            foreach (string role in roles)
            {
                allRoles += role;
            }
            
            return new SuccessfulLoginDto(accessToken, refreshToken, allRoles, user.Id, user.Email);
        }

        private bool IsNordDomain(string email) => NordDomains.Any(domain => email.EndsWith(domain));
    }
}

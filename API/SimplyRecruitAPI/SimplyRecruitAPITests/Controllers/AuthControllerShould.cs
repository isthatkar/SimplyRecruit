using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Auth;
using SimplyRecruitAPI.Controllers;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using static SimplyRecruitAPI.Auth.AuthDtos;

namespace SimplyRecruitAPITests.Controllers
{
    public class AuthControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnCurrentUser(
            SimplyUser userToReturn,
            [Frozen] Mock<IJwtTokenService> jwtTokenService,
            [Frozen] Mock<IConfiguration> configuration)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new AuthController(userManager.Object, jwtTokenService.Object, configuration.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            userManager.Setup(r => r.GetRolesAsync(It.IsAny<SimplyUser>())).ReturnsAsync(Roles.All.ToList());

            var result = await sut.CurrentUser();

            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var userDto = Assert.IsType<SuccessfulLoginDto>(okObjectResult.Value);
            Assert.Equal(userDto.email, userToReturn.Email);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCurrentUserNull(
            [Frozen] Mock<IJwtTokenService> jwtTokenService,
            [Frozen] Mock<IConfiguration> configuration)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));

            var sut = new AuthController(userManager.Object, jwtTokenService.Object, configuration.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync((SimplyUser)null!);

            var result = await sut.CurrentUser();

            var okObjectResult = Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfTriedToLogoutAndCouldNotFindUser(
            [Frozen] Mock<IJwtTokenService> jwtTokenService,
            [Frozen] Mock<IConfiguration> configuration)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));

            var sut = new AuthController(userManager.Object, jwtTokenService.Object, configuration.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync((SimplyUser)null!);

            var result = await sut.Revoke("randomId");

            var okObjectResult = Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task LogoutUser(
        SimplyUser userToReturn,
            [Frozen] Mock<IJwtTokenService> jwtTokenService,
            [Frozen] Mock<IConfiguration> configuration)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));

            var sut = new AuthController(userManager.Object, jwtTokenService.Object, configuration.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);

            var result = await sut.Revoke(userToReturn.Id);

            var okObjectResult = Assert.IsType<NoContentResult>(result);
            userManager.Verify(s => s.UpdateAsync(It.Is<SimplyUser>(u => u.RefreshToken == null && u.AccessToken == null)));
        }

        [Theory]
        [AutoData]
        public async Task ReturnBadRequestWhenTryingToRefreshTokenWithNullTokenModel(
            [Frozen] Mock<IJwtTokenService> jwtTokenService,
            [Frozen] Mock<IConfiguration> configuration)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));

            var sut = new AuthController(userManager.Object, jwtTokenService.Object, configuration.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            var result = await sut.RefreshToken(null!);

            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}

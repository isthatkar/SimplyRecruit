using System.ComponentModel.DataAnnotations;

namespace SimplyRecruitAPI.Auth
{
    public class AuthDtos
    {
        public record RegisterUserDto([Required] string UserName,[Required] string Name, [Required] string CompanyName, [Required] string Surname, [EmailAddress][Required] string Email, [Required] string Password);
        public record LoginUserDto([EmailAddress]string Email, string Password);

        public record GoogleLoginDto(string AccessToken);

        public record UserDto(string Id, string Email);
        public record SuccessfulLoginDto(string AccessToken, string refreshToken, string roles, string userId, string email);
        public record TokenDto(string? AccessToken, string RefreshToken);
    }
}

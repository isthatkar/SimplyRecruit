using Microsoft.AspNetCore.Identity;

namespace SimplyRecruitAPI.Auth.Model
{
    public class SimplyUser : IdentityUser
    {
        public string? AccessToken { get; set; }

        public string? RefreshToken { get; set; }

        public string? GoogleAccessToken { get; set; }

        public string? GoogleRefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}

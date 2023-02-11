using Microsoft.AspNetCore.Identity;

namespace SimplyRecruitAPI.Auth.Model
{
    public class SimplyUser : IdentityUser
    {
        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}

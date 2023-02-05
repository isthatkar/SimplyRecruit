using Microsoft.AspNetCore.Identity;

namespace SimplyRecruitAPI.Auth.Model
{
    public class SimplyUser : IdentityUser
    {
        [PersonalData]
        public string? Name { get; set; }

        [PersonalData]
        public string? Surname { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}

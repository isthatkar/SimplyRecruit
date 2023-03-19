using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Enums;

namespace SimplyRecruitAPI.Data.Entities
{
    public class Application : IUserOwnedResource
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string? ProfileUrl { get; set; }
        public string? CoverLetter { get; set; }
        public string ContactEmail { get; set; }
        public Stage Stage { get; set; }
        public Position Position { get; set; }
        public int PositionId { get; set; }
        public string UserId { get; set; }
        public string PositionName { get; set; }
        public double AverageSkillRating { get; set; }
        public double AverageCommsRating { get; set; }
        public double AverageAttitudeRating { get; set; }
        public double AverageRating { get; set; }
        public bool IsArchived { get; set; }
    }
}

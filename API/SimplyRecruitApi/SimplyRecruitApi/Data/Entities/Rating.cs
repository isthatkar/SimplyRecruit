using SimplyRecruitAPI.Auth.Model;

namespace SimplyRecruitAPI.Data.Entities
{
    public class Rating : IUserOwnedResource
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public Application Application { get; set; }
        public int CommunicationRating { get; set; }
        public int AttitudeRating { get; set; }
        public int  SkillsRating { get; set; }
        public string Comment { get; set; }

    }
}

using SimplyRecruitAPI.Auth.Model;

namespace SimplyRecruitAPI.Data.Entities
{
    public class Meeting : IUserOwnedResource
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string? MeetingUrl { get; set; }

        public string? SchedullingUrl { get; set; }

        public bool IsFinal { get; set; }

        public int DurationMinutes { get; set; }

        public DateTime? FinalTime { get; set; }

        public bool IsCanceled { get; set; }
        public string UserId { get; set; }

        public string Atendees { get; set; }

        public Application Application { get; set; }
    }
}

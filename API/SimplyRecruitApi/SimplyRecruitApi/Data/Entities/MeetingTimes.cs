namespace SimplyRecruitAPI.Data.Entities
{
    public class MeetingTimes
    {
        public int Id { get; set; }

        public DateTime StartTime { get; set; }

        public string? SelectedAtendees { get; set; }

        public Meeting Meeting { get; set; }
    }
}

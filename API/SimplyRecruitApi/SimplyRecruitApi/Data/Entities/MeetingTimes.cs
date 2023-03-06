namespace SimplyRecruitAPI.Data.Entities
{
    public class MeetingTimes
    {
        public int Id { get; set; }

        public DateTime StartTime { get; set; }

        public string? SelectedAttendees { get; set; }

        public Meeting Meeting { get; set; }
    }
}

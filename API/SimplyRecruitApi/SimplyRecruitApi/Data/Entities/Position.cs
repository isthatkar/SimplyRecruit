using SimplyRecruitAPI.Data.Enums;

namespace SimplyRecruitAPI.Data.Entities
{
    public class Position
    {
        public int Id { get; set; }

        public Project Project { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime Deadline { get; set; }

        public bool IsOpen { get; set; }

        public Location Location { get; set; }

        public WorkTime WorkTime { get; set; }

        public Field Field { get; set; }

        public string SalaryRange { get; set; }

        public string Expectations { get; set; }

        public string Duties { get; set; }

        public string Offers { get; set; }

        public int ProjectId { get; set; }

    }
}

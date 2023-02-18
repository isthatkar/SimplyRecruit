using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Enums;

namespace SimplyRecruitAPI.Data.Entities
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public NordProduct Product { get; set; }

        public string? ResponsiblePersonEmail { get; set; }
    }
}

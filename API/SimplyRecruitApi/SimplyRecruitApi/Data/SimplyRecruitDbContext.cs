using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data
{
    public class SimplyRecruitDbContext : IdentityDbContext<SimplyUser>
    {
        public SimplyRecruitDbContext(DbContextOptions<SimplyRecruitDbContext> options) : base(options)
        {

        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<MeetingTimes> MeetingTimes { get; set; }
        public DbSet<ApplicationTask> Tasks { get; set; }
        public DbSet<TaskAnswer> TaskAnswers { get; set; }

    }
}

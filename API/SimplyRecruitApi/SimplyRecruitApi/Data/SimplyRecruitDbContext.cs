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
    }
}

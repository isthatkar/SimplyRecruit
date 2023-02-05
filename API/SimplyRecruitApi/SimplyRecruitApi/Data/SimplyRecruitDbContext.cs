using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Auth.Model;

namespace SimplyRecruitAPI.Data
{
    public class SimplyRecruitDbContext : IdentityDbContext<SimplyUser>
    {
        public SimplyRecruitDbContext(DbContextOptions<SimplyRecruitDbContext> options) : base(options)
        {

        }
    }
}

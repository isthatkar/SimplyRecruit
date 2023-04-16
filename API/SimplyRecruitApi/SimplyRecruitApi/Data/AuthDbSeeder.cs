using Microsoft.AspNetCore.Identity;
using SimplyRecruitAPI.Auth.Model;

namespace SimplyRecruitAPI.Data
{
    public class AuthDbSeeder
    {
        private RoleManager<IdentityRole> _roleManager;

        public AuthDbSeeder(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await AddDefaultRoles();
        }

        private async Task AddDefaultRoles()
        {
            foreach (var role in Roles.All)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (!roleExists)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
    }
}
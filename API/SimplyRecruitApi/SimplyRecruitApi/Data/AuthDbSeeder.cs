using Microsoft.AspNetCore.Identity;
using SimplyRecruitAPI.Auth.Model;

namespace SimplyRecruitAPI.Data
{
    public class AuthDbSeeder
    {
        private UserManager<SimplyUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public AuthDbSeeder(UserManager<SimplyUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await AddDefaultRoles();
            await AddAdminUser();
        }

        private async Task AddAdminUser()
        {
            var newAdminUser = new SimplyUser()
            {
                UserName = "admin",
                Email = "admin@admin.com"
            };

            var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
            if (existingAdminUser == null)
            {
                if (createAdminUserResult.Succeeded)
                {
                    await _userManager.AddToRolesAsync(newAdminUser, Roles.All);
                }
            }
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

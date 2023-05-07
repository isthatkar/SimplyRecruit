using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Data.Repositories
{
    public class ApplicationsRepository : IApplicationsRepository
    {
        private readonly SimplyRecruitDbContext _context;

        public ApplicationsRepository(SimplyRecruitDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Application application)
        {
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Application application)
        {
            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Application>> GetAllPositionsApplicationsAsync(int positionId) => 
            await _context.Applications.Where(a => a.Position.Id == positionId).ToListAsync();

        public async Task<IReadOnlyList<Application>> GetAllUsersApplicationsAsync(string userId) => 
            await _context.Applications.Where(a => a.UserId == userId).ToListAsync();

        public async Task<Application?> GetAsync(int applicationId) =>
            await _context.Applications.FirstOrDefaultAsync(p => p.Id == applicationId);
 

        public async Task<IReadOnlyList<Application>> GetManyAsync() =>
            await _context.Applications.ToListAsync();
        

        public async Task UpdateAsync(Application application)
        {
            _context.Applications.Update(application);
            await _context.SaveChangesAsync();
        }
    }
}

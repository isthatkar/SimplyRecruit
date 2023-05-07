using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Data.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly SimplyRecruitDbContext _context;

        public TaskRepository(SimplyRecruitDbContext context)
        {
            _context = context;
        }
        public async Task CreateAsync(ApplicationTask task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(ApplicationTask task)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<ApplicationTask>> GetApplicationsManyAsync(int applicationId) =>
            await _context.Tasks.Where(p => p.Application.Id == applicationId).ToListAsync();

        public async Task<ApplicationTask?> GetAsync(int taskId) =>
            await _context.Tasks.FirstOrDefaultAsync(p => p.Id == taskId);

        public async Task UpdateAsync(ApplicationTask task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }
    }
}

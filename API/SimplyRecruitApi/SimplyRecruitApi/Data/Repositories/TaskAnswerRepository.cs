using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Data.Repositories
{
    public class TaskAnswerRepository : ITaskAnswerRepository
    {
        private readonly SimplyRecruitDbContext _context;

        public TaskAnswerRepository(SimplyRecruitDbContext context)
        {
            _context = context;
        }
        public async Task CreateAsync(TaskAnswer answer)
        {
            _context.TaskAnswers.Add(answer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(TaskAnswer answer)
        {
            _context.TaskAnswers.Remove(answer);
            await _context.SaveChangesAsync();
        }

        public async Task<TaskAnswer?> GetAsync(int answerId) =>
            await _context.TaskAnswers.FirstOrDefaultAsync(p => p.Id == answerId);

        public async Task<TaskAnswer> GetTaskAnswerAsync(int taskId) =>
            await _context.TaskAnswers.FirstOrDefaultAsync(p => p.Task.Id == taskId);
    }
}

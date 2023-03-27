using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface ITaskAnswerRepository
    {
        Task CreateAsync(TaskAnswer answer);
        Task DeleteAsync(TaskAnswer answer);
        Task<TaskAnswer?> GetAsync(int answerId);
        Task<TaskAnswer> GetTaskAnswerAsync(int taskId);
    }
}

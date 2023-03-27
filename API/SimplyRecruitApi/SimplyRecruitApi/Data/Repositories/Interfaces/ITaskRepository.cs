using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task CreateAsync(ApplicationTask task);
        Task DeleteAsync(ApplicationTask task);
        Task<ApplicationTask?> GetAsync(int taskId);
        Task<IReadOnlyList<ApplicationTask>> GetApplicationsManyAsync(int applicationId);
        Task UpdateAsync(ApplicationTask task);
    }
}

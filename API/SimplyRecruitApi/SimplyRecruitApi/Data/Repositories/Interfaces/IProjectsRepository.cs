using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface IProjectsRepository
    {
        Task CreateAsync(Project project);
        Task DeleteAsync(Project project);
        Task<Project?> GetAsync(int projectId);
        Task<IReadOnlyList<Project>> GetManyAsync();
        Task UpdateAsync(Project project);
    }
}

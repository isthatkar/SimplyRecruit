using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface IApplicationsRepository
    {
        Task CreateAsync(Application application);
        Task DeleteAsync(Application application);
        Task<Application?> GetAsync(int applicationId);
        Task<IReadOnlyList<Application>> GetManyAsync();
        Task<IReadOnlyList<Application>> GetAllPositionsApplicationsAsync(int positionId);
        Task<IReadOnlyList<Application>> GetAllUsersApplicationsAsync(string userId);
        Task UpdateAsync(Application application);
    }
}

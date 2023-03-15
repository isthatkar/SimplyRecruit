using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface IMeetingsRepository
    {
        Task CreateAsync(Meeting meeting);
        Task DeleteAsync(Meeting meeting);
        Task<Meeting?> GetAsync(int meetingId);
        Task<Meeting?> GetByUrlAsync(string schedulingUrl);
        Task<IReadOnlyList<Meeting>> GetUsersManyAsync(string userId);
        Task<IReadOnlyList<Meeting>> GetApplicationsManyAsync(int applicationId);
        Task UpdateAsync(Meeting meeting);
    }
}

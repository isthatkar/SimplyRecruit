using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface IRatingsRepository
    {
        Task CreateAsync(Rating rating);
        Task DeleteAsync(Rating rating);
        Task<Rating?> GetAsync(int ratingId);
        Task<IReadOnlyList<Rating>> GetApplicationRatings(int applicationId);
        Task UpdateAsync(Rating rating);
    }
}

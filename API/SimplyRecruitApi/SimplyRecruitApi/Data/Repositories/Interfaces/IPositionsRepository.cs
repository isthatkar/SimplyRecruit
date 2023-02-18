using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface IPositionsRepository
    {
        Task CreateAsync(Position position);
        Task DeleteAsync(Position position);
        Task<Position?> GetAsync(int positionId);
        Task<IReadOnlyList<Position>> GetManyAsync();
        Task<IReadOnlyList<Position>> GetProjectsManyAsync(int projectId);
        Task UpdateAsync(Position position);
    }
}

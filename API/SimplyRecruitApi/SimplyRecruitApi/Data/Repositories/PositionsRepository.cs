using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Data.Repositories
{
    public class PositionsRepository : IPositionsRepository
    {
        private readonly SimplyRecruitDbContext _context;

        public PositionsRepository(SimplyRecruitDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Position position)
        {
            _context.Positions.Add(position);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Position position)
        {
            _context.Positions.Remove(position);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Position>> GetProjectsManyAsync(int projectId) =>
            await _context.Positions.Where(p => p.Project.Id == projectId).ToListAsync();

        public async Task UpdateAsync(Position position)
        {
            _context.Positions.Update(position);
            await _context.SaveChangesAsync();
        }

        public async Task<Position?> GetAsync(int positionId) =>
            await _context.Positions.FirstOrDefaultAsync(p => p.Id == positionId);

        public async Task<IReadOnlyList<Position>> GetManyAsync() =>
            await _context.Positions.ToListAsync();
    }
}

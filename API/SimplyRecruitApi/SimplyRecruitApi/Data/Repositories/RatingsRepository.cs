using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Data.Repositories
{
    public class RatingsRepository : IRatingsRepository
    {
        private readonly SimplyRecruitDbContext _context;

        public RatingsRepository(SimplyRecruitDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Rating rating)
        {
            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Rating>> GetApplicationRatings(int applicationId)
        {
            return await _context.Ratings.Where(a => a.Application.Id == applicationId).ToListAsync();
        }

        public async Task<Rating?> GetAsync(int ratingId)
        {
            return await _context.Ratings.FirstOrDefaultAsync(p => p.Id == ratingId);
        }

        public async Task UpdateAsync(Rating rating)
        {
            _context.Ratings.Update(rating);
            await _context.SaveChangesAsync(); 
        }
    }
}

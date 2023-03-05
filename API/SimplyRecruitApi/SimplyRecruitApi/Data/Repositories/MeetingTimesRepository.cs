using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Data.Repositories
{
    public class MeetingTimesRepository : IMeetingTimesRepository
    {
        private readonly SimplyRecruitDbContext _context;

        public MeetingTimesRepository(SimplyRecruitDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(MeetingTimes time)
        {
            _context.MeetingTimes.Add(time);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(MeetingTimes time)
        {
            _context.MeetingTimes.Remove(time);
            await _context.SaveChangesAsync();
        }

        public async Task<MeetingTimes?> GetAsync(int time)
        {
            return await _context.MeetingTimes.FirstOrDefaultAsync(p => p.Id == time);
        }

        public async Task<IReadOnlyList<MeetingTimes>> GetMeetingsManyAsync(int meetingId)
        {
            return await _context.MeetingTimes.Where(p => p.Meeting.Id == meetingId).ToListAsync();
        }

        public async Task UpdateAsync(MeetingTimes time)
        {
            _context.MeetingTimes.Update(time);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateManyAsync(MeetingTimes[] times)
        {
            foreach (MeetingTimes time in times)
            {
                _context.Update(time);
            }

            await _context.SaveChangesAsync();
        }
    }
}

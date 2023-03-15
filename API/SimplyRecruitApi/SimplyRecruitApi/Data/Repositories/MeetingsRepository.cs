using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Data.Repositories
{
    public class MeetingsRepository : IMeetingsRepository
    {
        private readonly SimplyRecruitDbContext _contex;

        public MeetingsRepository(SimplyRecruitDbContext context)
        {
            _contex = context;
        }

        public async Task CreateAsync(Meeting meeting)
        {
            _contex.Meetings.Add(meeting);
            await _contex.SaveChangesAsync();
        }

        public async Task DeleteAsync(Meeting meeting)
        {
            _contex.Meetings.Remove(meeting);
            await _contex.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Meeting>> GetApplicationsManyAsync(int applicationId)
        {
            return await _contex.Meetings.Where(m => m.Application.Id == applicationId).ToListAsync();
        }

        public async Task<Meeting?> GetAsync(int meetingId)
        {
            return await _contex.Meetings.FirstOrDefaultAsync(m => m.Id == meetingId);
        }

        public async Task<Meeting?> GetByUrlAsync(string schedulingUrl)
        {
            return await _contex.Meetings.FirstOrDefaultAsync(m => m.SchedullingUrl == schedulingUrl);
        }

        public async Task<IReadOnlyList<Meeting>> GetUsersManyAsync(string email)
        {
            return await _contex.Meetings.Where(m => m.Atendees.Contains(email)).ToListAsync();
        }

        public async Task UpdateAsync(Meeting meeting)
        {
            _contex.Meetings.Update(meeting);
            await _contex.SaveChangesAsync();
        }
    }
}

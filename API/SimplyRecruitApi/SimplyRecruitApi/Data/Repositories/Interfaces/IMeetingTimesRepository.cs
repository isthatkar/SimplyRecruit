using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface IMeetingTimesRepository
    {
        Task CreateAsync(MeetingTimes time);
        Task DeleteAsync(MeetingTimes time);
        Task UpdateAsync(MeetingTimes time);
        Task<MeetingTimes?> GetAsync(int time);
        Task<IReadOnlyList<MeetingTimes>> GetMeetingsManyAsync(int meetingId);
        Task UpdateManyAsync(MeetingTimes[] times);
    }
}

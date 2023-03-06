using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Dtos.Meetings
{
    public record MeetingDtoWithTimes(int Id, string Title, string Description, string? MeetingUrl, string? SchedulingUrl, bool isFinal, int DurationMinutes, bool isCanceled, string Atendees, int ApplicationId, MeetingTimes[] times);
    public record MeetingDto(int Id, string Title, string Description, DateTime? FinalTime, bool IsFinalTime, string Attendees, MeetingTimes[] MeetingTimes, int Duration, string? SchedulingUrl, string? MeetingUrl, bool IsCanceled);
    public record CreateMeetingTimesDto(DateTime[] times);
    public record CreateMeetingDto(string Title, string Description, string MeetingUrl, string SchedulingUrl, bool IsFinal, int DurationMinutes, string Atendees, CreateMeetingTimesDto? meetingTimes, DateTime? FinalTime);
    public record SelectMeetingTimesDto(int[] Ids);
}

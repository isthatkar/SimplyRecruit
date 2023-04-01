using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Dtos.Meetings
{
    public record MeetingDtoWithTimes(int Id, string UserId, string Title, string Description, string? MeetingUrl, string? SchedulingUrl, bool isFinal, int DurationMinutes, bool isCanceled, string Atendees, string SelectedAtendees, int ApplicationId, MeetingTimes[] times);
    public record MeetingDto(int Id, string UserId, string Title, string Description, DateTime? FinalTime, bool IsFinalTime, string Attendees, string SelectedAtendees, MeetingTimes[] MeetingTimes, int Duration, string? SchedulingUrl, string? MeetingUrl, bool IsCanceled);
    public record CreateMeetingDto(string Title, string Description, string MeetingUrl, string SchedulingUrl, bool IsFinalTime, int Duration, string Attendees, DateTime[]? MeetingTimes, DateTime? FinalTime);
    public record SelectMeetingTimesDto(int meetingId, int[] Ids);
    public record UpdateMeetingDto(string? Title, string? Description, DateTime? FinalTime, bool? IsFinalTime, string? Attendees, MeetingTimes[]? NewMeetingTimes, int? Duration, string? MeetingUrl, bool? IsCanceled);

}

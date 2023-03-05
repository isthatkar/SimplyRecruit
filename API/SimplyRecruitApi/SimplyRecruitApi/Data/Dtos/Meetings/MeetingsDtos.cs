using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Dtos.Meetings
{
    public record MeetingDtoWithTimes(int Id, string Title, string Description, string? MeetingUrl, string? SchedulingUrl, bool isFinal, int DurationMinutes, bool isCanceled, string Atendees, int ApplicationId, MeetingTimes[] times);
    public record MeetingDto(int Id, string Title, string Description, DateTime? FinalTime, bool IsFinalTime, string Attendees, MeetingTimes[] MeetingTimes, int Duration, string SchedulingUrl, string MeetingUrl, bool IsCanceled);

    public record CreateMeetingTimesDto(DateTime[] times);
    /*id: number;
      title: string;
      description: string;
      finalTime: string;
      isFinalTime: boolean;
      attendees: string[];
      meetingTimes: MeetingTime[];
      duration: number;
      schedulingUrl: string;
      meetingUrl: string;
      isCanceled: boolean;*/
    public record CreateMeetingDto(string Title, string Description, string MeetingUrl, string SchedulingUrl, bool IsFinal, int DurationMinutes, string Atendees, CreateMeetingTimesDto meetingTimes);
    /* 
     * Title = createMeetingDto.Title,
               Description = createMeetingDto.Description,
               MeetingUrl =,
               SchedullingUrl =,
               IsFinal =,
               DurationMinutes =,
               FinalTime = ,
               IsCanceled =,
               UserId =,
               Atendees =,
               Application = application*/
}

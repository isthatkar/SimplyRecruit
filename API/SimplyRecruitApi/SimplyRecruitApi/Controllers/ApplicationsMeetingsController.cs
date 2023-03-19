using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Dtos.Meetings;
using Microsoft.IdentityModel.JsonWebTokens;
using SimplyRecruitAPI.Helpers;

namespace SimplyRecruitAPI.Controllers
{
    [ApiController]
    [Route("api/applications/{applicationId}/meetings")]
    public class ApplicationsMeetingsController : ControllerBase
    {
        private readonly IMeetingsRepository _meetingsRepository;
        private readonly IApplicationsRepository _applicationsRepository;
        private readonly IMeetingTimesRepository _meetingTimesRepository;

        public ApplicationsMeetingsController(IMeetingsRepository meetingsRepository, IApplicationsRepository applicationsRepository, IMeetingTimesRepository meetingTimesRepository)
        {
            _meetingsRepository = meetingsRepository;
            _applicationsRepository = applicationsRepository;
            _meetingTimesRepository = meetingTimesRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<MeetingDto>>> GetApplicationMeetings(int applicationId)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            var meetings = await _meetingsRepository.GetApplicationsManyAsync(applicationId);
            var meetingsDto = meetings.Select(m => new MeetingDto(
                m.Id,
                m.UserId,
                m.Title,
                m.Description,
                m.FinalTime,
                m.IsFinal,
                m.Atendees,
                m.SelectedAtendees,
                new MeetingTimes[] {  },
                m.DurationMinutes,
                m.SchedullingUrl,
                m.MeetingUrl,
                m.IsCanceled
               
               ));
            return Ok(meetingsDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MeetingDtoWithTimes>> Create(int applicationId, CreateMeetingDto createMeetingDto)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound("Application to which you want to add meeting was not found");
            }

            var meeting = new Meeting
            {
               Title = createMeetingDto.Title,
               Description = createMeetingDto.Description,
               MeetingUrl = createMeetingDto.MeetingUrl,
               SchedullingUrl = application.Id + RandomStringGenerator.GenerateRandomString(25),
               IsFinal = createMeetingDto.IsFinal,
               DurationMinutes = createMeetingDto.DurationMinutes,
               FinalTime = createMeetingDto.IsFinal ? createMeetingDto.FinalTime : new DateTime(),
               IsCanceled = false,
               SelectedAtendees = string.Empty,
               UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub),
               Atendees = CleanAttendiesString(createMeetingDto.Atendees),
               Application = application
            };

            await _meetingsRepository.CreateAsync(meeting);

            IEnumerable<MeetingTimes> meetingTimes = new List<MeetingTimes>();
            if (!createMeetingDto.IsFinal)
            {
                meetingTimes = createMeetingDto.meetingTimes.times.Select(t => new MeetingTimes()
                {
                    SelectedAttendees = string.Empty,
                    StartTime = t,
                    Meeting = meeting
                });

                foreach (MeetingTimes time in meetingTimes)
                {
                    await _meetingTimesRepository.CreateAsync(time);
                }
            }
          

            //201
            return Created("", new MeetingDtoWithTimes(
                meeting.Id,
                meeting.UserId,
                meeting.Title,
                meeting.Description,
                meeting.MeetingUrl,
                meeting.SchedullingUrl,
                meeting.IsFinal,
                meeting.DurationMinutes,
                meeting.IsCanceled,
                meeting.Atendees,
                meeting.SelectedAtendees,
                applicationId,
                meetingTimes.ToArray()
               ));
        }

        private string CleanAttendiesString(string attendies)
        {
            string[] listOfAttendees = attendies.Split(';');
            IEnumerable<string> distinctSubstrings = listOfAttendees
                .GroupBy(s => s)
                .Select(g => g.Key);

            string cleanedString = string.Join(";", distinctSubstrings);
            return cleanedString;
        }
    }
}

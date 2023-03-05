using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using static SimplyRecruitAPI.Data.Dtos.Applications.ApplicationsDtos;
using System.Security.Claims;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Dtos.Meetings;
using Microsoft.IdentityModel.JsonWebTokens;

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
                m.Title,
                m.Description,
                m.FinalTime,
                m.IsFinal,
                m.Atendees,
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
               SchedullingUrl = createMeetingDto.SchedulingUrl,
               IsFinal = createMeetingDto.IsFinal,
               DurationMinutes = createMeetingDto.DurationMinutes,
               FinalTime = new DateTime(),
               IsCanceled = false,
               UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub),
               Atendees = createMeetingDto.Atendees,
               Application = application
            };

            IEnumerable<MeetingTimes> meetingTimes = createMeetingDto.meetingTimes.times.Select(t => new MeetingTimes()
            {
                SelectedAtendees = string.Empty,
                StartTime = t,
                Meeting = meeting
            });

            if (createMeetingDto.IsFinal)
            {
                meeting.FinalTime = meetingTimes.First().StartTime;
            }

            await _meetingsRepository.CreateAsync(meeting);
            foreach(MeetingTimes time in meetingTimes)
            {
                await _meetingTimesRepository.CreateAsync(time);
            }

            //201
            return Created("", new MeetingDtoWithTimes(
                meeting.Id,
                meeting.Title,
                meeting.Description,
                meeting.MeetingUrl,
                meeting.SchedullingUrl,
                meeting.IsFinal,
                meeting.DurationMinutes,
                meeting.IsCanceled,
                meeting.Atendees,
                applicationId,
                meetingTimes.ToArray()
               ));
        }
    }
}

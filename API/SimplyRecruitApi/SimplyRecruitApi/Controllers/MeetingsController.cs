using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Dtos.Meetings;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;

namespace SimplyRecruitAPI.Controllers
{
    [ApiController]
    [Route("api/meetings")]
    public class MeetingsController : ControllerBase
    {
        private readonly IMeetingsRepository _meetingsRepository;
        private readonly IMeetingTimesRepository _meetingsTimesRepository;
        private UserManager<SimplyUser> _userManager;

        public MeetingsController(IMeetingsRepository meetingsRepository, IMeetingTimesRepository meetingsTimesRepository, UserManager<SimplyUser> userManager)
        {
            _meetingsRepository = meetingsRepository;
            _meetingsTimesRepository = meetingsTimesRepository;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<MeetingDto>> GetUsersMany()
        {
            string userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await _userManager.FindByIdAsync(userId);

            var userMeetings = await _meetingsRepository.GetUsersManyAsync(user.Email);

            IEnumerable<MeetingDto> meetingsDto = new List<MeetingDto>();
            foreach(var m in userMeetings)
            {
                IEnumerable<MeetingTimes> meetTimes = await _meetingsTimesRepository.GetMeetingsManyAsync(m.Id);
                meetingsDto = meetingsDto.Append(new MeetingDto(
                m.Id,
                m.Title,
                m.Description,
                m.FinalTime,
                m.IsFinal,
                m.Atendees,
                m.SelectedAtendees,
                meetTimes.ToArray(),
                m.DurationMinutes,
                m.SchedullingUrl,
                m.MeetingUrl,
                m.IsCanceled
               ));
            }

            return meetingsDto;
        }

        [HttpGet]
        [Route("{meetingId}", Name = "GetMeeting")]
        [Authorize]
        public async Task<ActionResult<MeetingDto>> GetMeeting(int meetingId)
        {

            var meeting = await _meetingsRepository.GetAsync(meetingId);

            if (meeting == null)
            {
                return NotFound();
            }

            IEnumerable<MeetingTimes> meetTimes = await _meetingsTimesRepository.GetMeetingsManyAsync(meeting.Id);
           return new MeetingDto(
                meeting.Id,
                meeting.Title,
                meeting.Description,
                meeting.FinalTime,
                meeting.IsFinal,
                meeting.Atendees,
                meeting.SelectedAtendees,
                meetTimes.ToArray(),
                meeting.DurationMinutes,
                meeting.SchedullingUrl,
                meeting.MeetingUrl,
                meeting.IsCanceled
               );
        }

        [HttpGet]
        [Route("url/{meetingUrl}", Name = "GetMeetingByUrl")]
        [Authorize]
        public async Task<ActionResult<MeetingDto>> GetMeetingByUrl(string meetingUrl)
        {

            var meeting = await _meetingsRepository.GetByUrlAsync(meetingUrl);

            if(meeting == null)
            {
                return NotFound();
            }

            IEnumerable<MeetingTimes> meetTimes = await _meetingsTimesRepository.GetMeetingsManyAsync(meeting.Id);
            return new MeetingDto(
                 meeting.Id,
                 meeting.Title,
                 meeting.Description,
                 meeting.FinalTime,
                 meeting.IsFinal,
                 meeting.Atendees,
                 meeting.SelectedAtendees,
                 meetTimes.ToArray(),
                 meeting.DurationMinutes,
                 meeting.SchedullingUrl,
                 meeting.MeetingUrl,
                 meeting.IsCanceled
                );
        }
    }
}

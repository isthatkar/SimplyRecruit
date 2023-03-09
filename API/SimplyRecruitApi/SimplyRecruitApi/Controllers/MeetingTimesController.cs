using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Dtos.Meetings;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;

namespace SimplyRecruitAPI.Controllers
{
    [ApiController]
    [Route("api/meetingTimes")]
    public class MeetingTimesController : ControllerBase
    {
        private readonly IMeetingTimesRepository _meetingTimesRepository;
        private readonly IMeetingsRepository _meetingsRepository;
        private UserManager<SimplyUser> _userManager;
        public MeetingTimesController(IMeetingTimesRepository meetingTimesRepository, UserManager<SimplyUser> userManager, IMeetingsRepository meetingsRepository)
        {
            _meetingTimesRepository = meetingTimesRepository;
            _userManager = userManager;
            _meetingsRepository = meetingsRepository;
        }

        [HttpPut]
        [Authorize]
        [Route("select")]
        public async Task<ActionResult> Select(SelectMeetingTimesDto dto)
        {
            string userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await _userManager.FindByIdAsync(userId);

            var meet = await _meetingsRepository.GetAsync(dto.meetingId);
            if(meet == null)
            {
                return NotFound();
            }

            meet.SelectedAtendees = meet.SelectedAtendees == "" ? user.Email : meet.SelectedAtendees + ";" + user.Email;

            foreach(var id in dto.Ids)
            {
               var meeting = await _meetingTimesRepository.GetAsync(id);
                if(meeting == null)
                {
                    return NotFound();
                }

               if ( meeting.SelectedAttendees == ""){
                    meeting.SelectedAttendees = meeting.SelectedAttendees += $"{user.Email}";
                }
                else
                {
                    meeting.SelectedAttendees = meeting.SelectedAttendees += $";{user.Email}";
                }
                await _meetingTimesRepository.UpdateAsync(meeting);
            }

            return Ok();
        }

    }
}

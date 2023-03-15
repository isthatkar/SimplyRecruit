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

            if (meet.SelectedAtendees.Contains(user.Email)) //remove all user selected values if he has selected before
            {
                var meetingMeetingTimes = await _meetingTimesRepository.GetMeetingsManyAsync(dto.meetingId);
               foreach (MeetingTimes meeting in meetingMeetingTimes)
                {
                    if(meeting.SelectedAttendees is not null)
                    {
                        meeting.SelectedAttendees = RemoveEmailFromString(meeting.SelectedAttendees, user.Email);
                    }
                }
            }

            if (!meet.SelectedAtendees.Contains(user.Email)) //add user to selected atendees 
            {
                meet.SelectedAtendees = meet.SelectedAtendees == "" ? user.Email : meet.SelectedAtendees + ";" + user.Email;
            }

            foreach (var id in dto.Ids) //add all selected values 
            {
               var meeting = await _meetingTimesRepository.GetAsync(id);
                if(meeting == null)
                {
                    return NotFound();
                }

               if ( meeting.SelectedAttendees == "" || meeting.SelectedAttendees is null){
                    meeting.SelectedAttendees = meeting.SelectedAttendees += $"{user.Email}";
                }
                else if(!meeting.SelectedAttendees.Contains(user.Email))
                {
                    meeting.SelectedAttendees = meeting.SelectedAttendees += $";{user.Email}";
                }
                await _meetingTimesRepository.UpdateAsync(meeting);
            }

            return Ok();
        }

        private string RemoveEmailFromString(string attendiesList, string emailToRemove)
        {
            string[] emailArray = attendiesList.Split(';'); 
            List<string> emailListWithoutRemoved = emailArray.ToList().Where(x => x != emailToRemove).ToList();
            string updatedEmailList = string.Join(";", emailListWithoutRemoved);

            return updatedEmailList;
        }

    }
}

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
    //[Authorize] SITA NEPAMIRSTTTTT
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

       /* [HttpGet]
        [Authorize]
        public async Task<IEnumerable<MeetingDto>> GetUsersMany()
        {
            string userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await _userManager.FindByIdAsync(userId);

            var userMeetings = await _meetingsRepository.GetUsersManyAsync(user.Email);

            return userMeetings.Select(m => new MeetingDto(
                m.Id, 
                m.Title,
                m.Description,
                m.MeetingUrl,
                m.SchedullingUrl,
                m.IsFinal,
                m.DurationMinutes,
                m.IsCanceled,
                m.Atendees,
                m.Application.Id));
        }*/
    }
}

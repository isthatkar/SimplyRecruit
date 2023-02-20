using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Enums;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static SimplyRecruitAPI.Data.Dtos.Applications.ApplicationsDtos;

namespace SimplyRecruitAPI.Controllers
{
    [ApiController]
    [Route("api/positions/{positionId}/applications")]
    public class PositionApplicationsController : ControllerBase
    {
        private readonly IApplicationsRepository _applicationsRepository;
        private readonly IPositionsRepository _positionsRepository;

        public PositionApplicationsController(IApplicationsRepository applicationsRepository, IPositionsRepository positionsRepository)
        {
            _applicationsRepository = applicationsRepository;
            _positionsRepository = positionsRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PositionApplicationDto>>> GetPositionsApplications(int positionId)
        {
            var position = await _positionsRepository.GetAsync(positionId);

            if (position == null)
            {
                return NotFound(); //404
            }

            var applications = await _applicationsRepository.GetAllPositionsApplicationsAsync(positionId);
            var applicationsDto = applications.Select(a => new PositionApplicationDto(
                a.Id, 
                a.FullName,
                a.PhoneNumber,
                a.ProfileUrl,
                a.CoverLetter,
                a.ContactEmail,
                a.Stage,
                a.UserId,
                a.PositionName));
            return Ok(applicationsDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ApplicationDto>> Create(int positionId, CreateApplicationDto createApplicationDto)
        {
            var position = await _positionsRepository.GetAsync(positionId);

            if (position == null)
            {
                return NotFound("Position to which you want to add position was not found");
            }

            var application = new Application
            {
                FullName = createApplicationDto.FullName,
                PhoneNumber = createApplicationDto.PhoneNumber,
                ProfileUrl = createApplicationDto.ProfileUrl,
                CoverLetter = createApplicationDto.CoverLetter,
                ContactEmail = createApplicationDto.ContactEmail,
                Stage = Stage.New,
                Position = position,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub),
                PositionName = position.Name
            };
    
            await _applicationsRepository.CreateAsync(application);

            //201
            return Created("", new ApplicationDto(
                application.Id,
                application.FullName,
                application.PhoneNumber,
                application.ProfileUrl,
                application.CoverLetter,
                application.ContactEmail,
                application.Stage,
                application.PositionId,
                application.UserId,
                application.PositionName
               ));
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Enums;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static SimplyRecruitAPI.Data.Dtos.Applications.ApplicationsDtos;

namespace SimplyRecruitAPI.Controllers
{
    [Route("api/applications")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationsRepository _applicationsRepository;

        public ApplicationsController(IApplicationsRepository applicationsRepository)
        {
            _applicationsRepository = applicationsRepository;
        }

        [HttpGet]
        [Authorize(Roles = Roles.Employee)]
        public async Task<IEnumerable<ApplicationDto>> GetMany()
        {
            var applications = await _applicationsRepository.GetManyAsync();
            return applications.Select(a => new ApplicationDto(
                a.Id,
                a.FullName,
                a.PhoneNumber,
                a.ProfileUrl,
                a.CoverLetter,
                a.ContactEmail,
                a.Stage,
                a.PositionId,
                a.UserId,
                a.PositionName));
        }

        [HttpGet]
        [Authorize(Roles = Roles.Employee)]
        [Route("{applicationId}", Name = "GetApplication")]
        public async Task<ActionResult<ApplicationDto>> Get(int applicationId)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            return new ApplicationDto(
                application.Id,
                application.FullName,
                application.PhoneNumber,
                application.ProfileUrl,
                application.CoverLetter,
                application.ContactEmail,
                application.Stage,
                application.PositionId,
                application.UserId,
                application.PositionName);
        }

        [HttpGet]
        [Authorize]
        [Route("currentUser", Name = "GetUserApplications")]
        public async Task<IEnumerable<ApplicationDto>> GetCurrentUsersApplications()
        {
            string userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var applications = await _applicationsRepository.GetAllUsersApplicationsAsync(userId);
            return applications.Select(a => new ApplicationDto(
                a.Id,
                a.FullName,
                a.PhoneNumber,
                a.ProfileUrl,
                a.CoverLetter,
                a.ContactEmail,
                a.Stage,
                a.PositionId,
                a.UserId,
                a.PositionName));
        }

        [HttpPut]
        [Authorize(Roles = Roles.Employee)] //cadidates cannot edit their applications
        [Route("{applicationId}")]
        public async Task<ActionResult<Application>> Update(int applicationId, UpdateApplicationDto updateApplicationDto)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            application.FullName = updateApplicationDto.FullName is null ? application.FullName : updateApplicationDto.FullName;
            application.PhoneNumber = updateApplicationDto.PhoneNumber is null ? application.PhoneNumber : updateApplicationDto.PhoneNumber;
            application.ProfileUrl = updateApplicationDto.ProfileUrl is null ? application.ProfileUrl : updateApplicationDto.ProfileUrl;
            application.CoverLetter = updateApplicationDto.CoverLetter is null ? application.CoverLetter : updateApplicationDto.CoverLetter;
            application.ContactEmail = updateApplicationDto.ContactEmail is null ? application.ContactEmail : updateApplicationDto.ContactEmail;
            application.Stage = (Stage)(updateApplicationDto.Stage is null ? application.Stage : updateApplicationDto.Stage);

            await _applicationsRepository.UpdateAsync(application);

            return Ok(new ApplicationDto(
                application.Id,
                application.FullName,
                application.PhoneNumber,
                application.ProfileUrl,
                application.CoverLetter,
                application.ContactEmail,
                application.Stage,
                application.PositionId,
                application.UserId, 
                application.PositionName));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.Employee)] //candidates cannot delete applications
        [Route("{applicationId}")]
        public async Task<ActionResult> Remove(int applicationId)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            await _applicationsRepository.DeleteAsync(application);

            //204
            return NoContent();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Dtos.Resumes;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mime;
using System.Security.Claims;

namespace SimplyRecruitAPI.Controllers
{
    [Route("api/applications/{applicationId}")]
    [ApiController]
    public class ResumesController : ControllerBase
    {
        private readonly IResumesRepository _resumesRepository;
        private readonly IApplicationsRepository _applicationsRepository;

        public ResumesController(IResumesRepository resumesRepository, IApplicationsRepository applicationsRepository)
        {
            _resumesRepository = resumesRepository;
            _applicationsRepository = applicationsRepository;
        }

        [HttpGet]
        [Route("resume")]
        [Authorize(Roles = Roles.Employee)]
        public async Task<ActionResult<ResumeDto>> Get(int applicationId)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            var resume = await _resumesRepository.GetApplicationResumeAsync(applicationId);

            if (resume == null)
            {
                return NotFound(); //404
            }

            byte[] fileData = resume.Data;

            /*// Save the file to the desktop
            string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            string fileName = resume.FileName; // Replace with the actual file name and extension
            string filePath = Path.Combine(desktopPath, fileName);
            object value = File.WriteAllBytes(filePath, fileData);*/

            return new ResumeDto(resume.Id, resume.FileName, resume.Data);
        }

        [HttpGet("download")]
        public async Task<IActionResult> DownloadResume(int applicationId)
        {
            var resume = await _resumesRepository.GetApplicationResumeAsync(applicationId);
            if (resume == null)
            {
                return NotFound();
            }

            var contentDisposition = new ContentDisposition
            {
                FileName = resume.FileName,
                Inline = false,  // forces download
            };
            Response.Headers.Add("Content-Disposition", contentDisposition.ToString());

            byte[] fileData = resume.Data;
            string fileName = resume.FileName;

            return File(fileData, "application/octet-stream", fileName);
        }

        [HttpPost]
        [Authorize]
        [Route("resume")]
        public async Task<ActionResult<ResumeDto>> Create(int applicationId, [FromForm] IFormFile file, [FromForm] CreateResumeDto createResumeDto)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub); //only let the user that created the application to upload a resume
            if (application.UserId != userId)
            {
                return Unauthorized(); //404
            }

            var existingResume = await _resumesRepository.GetApplicationResumeAsync(applicationId);

            if (existingResume != null)
            {
                return BadRequest("Application already has a resume attached");
            }

            var resume = new Resume()
            {
                FileName = createResumeDto.FileName,
                Application = application,
            };

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                resume.Data = memoryStream.ToArray();
            }

            await _resumesRepository.CreateAsync(resume);
            return Created("", new ResumeDto(resume.Id, resume.FileName, resume.Data));
        }
    }
}

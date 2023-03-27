using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Dtos.Tasks;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using SimplyRecruitAPI.Auth.Model;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;

namespace SimplyRecruitAPI.Controllers
{
    [ApiController]
    [Route("api/applications/{applicationId}/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IApplicationsRepository _applicationsRepository;
        private readonly UserManager<SimplyUser> _userManager;

        public TaskController(ITaskRepository taskRepository, IApplicationsRepository applicationsRepository, UserManager<SimplyUser> userManager)
        {
            _taskRepository = taskRepository;
            _applicationsRepository = applicationsRepository;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize(Roles = Roles.Employee)]
        public async Task<ActionResult<TaskDto>> Create(int applicationId, [FromForm] IFormFile? file, [FromForm] CreateTaskDto createTaskDto)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound("Application to which you want to add task was not found");
            }

            string userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            var task = new ApplicationTask
            {
               Title = createTaskDto.Title,
               Goal = createTaskDto.Goal,
               AnswerSubmited = false,
               Deadline = createTaskDto.Deadline,
               FileName = createTaskDto.FileName,
               Url = createTaskDto.Url,
               UserId = userId,
               Application = application
            };

            if(task.FileName != null && file!= null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    task.FileData = memoryStream.ToArray();
                }
            }

            await _taskRepository.CreateAsync(task);

            //201
            return Created("", new TaskDto(
                task.Id, 
                task.Title,
                task.Goal,
                task.AnswerSubmited,
                task.Deadline,
                task.FileName,
                task.Url, 
                applicationId
               ));
        }

        [HttpGet("download/{taskId}")]
        [Authorize]
        public async Task<IActionResult> DownloadResume(int applicationId, int taskId)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound("Application to which you want to add task was not found");
            }

            var task = await _taskRepository.GetAsync(taskId);

            if (task == null || task.FileData == null || task.FileName == null)
            {
                return NotFound();
            }

            byte[] fileData = task.FileData;
            string fileName = task.FileName;

            return File(fileData, "application/octet-stream", fileName);
        }


        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetApplicationTasks(int applicationId)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            var tasks = await _taskRepository.GetApplicationsManyAsync(applicationId);
            var tasksDto = tasks.Select(t => new TaskDto(
               t.Id,
               t.Title,
               t.Goal,
               t.AnswerSubmited,
               t.Deadline,
               t.FileName,
               t.Url,
               applicationId
               ));
            return Ok(tasksDto);
        }


        [HttpGet]
        [Authorize]
        [Route("{taskId}")]
        public async Task<ActionResult<TaskDto>> GetTask(int applicationId, int taskId)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            var task = await _taskRepository.GetAsync(taskId);

            if(task == null)
            {
                return NotFound();
            }

            var tasksDto = new TaskDto(
               task.Id,
               task.Title,
               task.Goal,
               task.AnswerSubmited,
               task.Deadline,
               task.FileName,
               task.Url,
               applicationId
               );

            return Ok(tasksDto);
        }
    }
}

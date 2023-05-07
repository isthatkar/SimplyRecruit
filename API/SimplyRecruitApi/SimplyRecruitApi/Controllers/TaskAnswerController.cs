using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using SimplyRecruitAPI.Data.Dtos.Tasks;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;

namespace SimplyRecruitAPI.Controllers
{
    [ApiController]
    [Route("api/tasks/{taskId}/answer")]
    public class TaskAnswerController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;
        private readonly ITaskAnswerRepository _taskAnswerRepository;

        public TaskAnswerController(ITaskRepository taskRepository, ITaskAnswerRepository taskAnswerRepository)
        {
            _taskRepository = taskRepository;
            _taskAnswerRepository = taskAnswerRepository;
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TaskAnswerDto>> Create(int taskId, [FromForm] IFormFile? file, [FromForm] CreateTaskAnswerDto createTaskAnswerDto)
        {
            var task = await _taskRepository.GetAsync(taskId);

            if (task == null)
            {
                return NotFound("Task to which you want to add task was not found");
            }

            string userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            var taskAnswer = await _taskAnswerRepository.GetTaskAnswerAsync(taskId);

            if (taskAnswer != null || task.Deadline < DateTime.UtcNow)
            {
                return BadRequest("Task already has an answer added or answer deadline has passed");
            }

            var newTaskAnswer = new TaskAnswer
            {
                Comment = createTaskAnswerDto.Commment,
                FileName = createTaskAnswerDto.FileName,
                Url = createTaskAnswerDto.Url,
                Task = task,
                UserId = userId
            };

            if (newTaskAnswer.FileName != null && file != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    newTaskAnswer.FileData = memoryStream.ToArray();
                }
            }

            await _taskAnswerRepository.CreateAsync(newTaskAnswer);

            //update task that the answer was submited
            task.AnswerSubmited = true;
            await _taskRepository.UpdateAsync(task);

            //201
            return Created("", new TaskAnswerDto(
                newTaskAnswer.Id,
                newTaskAnswer.Comment,
                newTaskAnswer.FileName,
                newTaskAnswer.Url,
                taskId
               ));
        }

        [HttpGet("download")]
        [Authorize]
        public async Task<IActionResult> DownloadResume(int taskId)
        {
            var task = await _taskRepository.GetAsync(taskId);

            if (task == null)
            {
                return NotFound("Could not find task");
            }

            var taskAnswer = await _taskAnswerRepository.GetTaskAnswerAsync(taskId);

            if (taskAnswer == null)
            {
                return NotFound("Could not find task answer");
            }

            if (taskAnswer == null || taskAnswer.FileData == null || taskAnswer.FileName == null)
            {
                return NotFound();
            }

            byte[] fileData = taskAnswer.FileData;
            string fileName = taskAnswer.FileName;

            return File(fileData, "application/octet-stream", fileName);
        }


        [HttpGet]
        [Authorize]
        public async Task<ActionResult<TaskAnswerDto>> GetTaskAnswer(int taskId)
        {
            var task = await _taskRepository.GetAsync(taskId);

            if (task == null)
            {
                return NotFound(); //404
            }

            var taskAnswer = await _taskAnswerRepository.GetTaskAnswerAsync(taskId);

            if (taskAnswer == null)
            {
                return NotFound(); //404
            }

            var tasksDto = new TaskAnswerDto(
                taskAnswer.Id,
                taskAnswer.Comment,
                taskAnswer.FileName,
                taskAnswer.Url,
                taskId
               );

            return Ok(tasksDto);
        }
    }
}

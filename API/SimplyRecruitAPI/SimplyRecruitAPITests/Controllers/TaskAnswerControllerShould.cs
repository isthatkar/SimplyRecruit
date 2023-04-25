using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Tasks;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class TaskAnswerControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnCreatedResultWhenTaskAnswerCreatedSuccessfully(
           [Frozen] Mock<ITaskRepository> taskRepository,
           [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository,
           Mock<IFormFile> formFile,
           ApplicationTask task,
           CreateTaskAnswerDto dto)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            task.Deadline = DateTime.MaxValue;
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync((TaskAnswer)null);

            var result = await sut.Create(6, formFile.Object, dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskAnswerDto>>(result);
            Assert.IsType<CreatedResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundWhenCouldNotFindTaskToAddAnswerTo(
         [Frozen] Mock<ITaskRepository> taskRepository,
         [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository,
         Mock<IFormFile> formFile,
         CreateTaskAnswerDto dto)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((ApplicationTask)null);

            var result = await sut.Create(6, formFile.Object, dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskAnswerDto>>(result);
            Assert.IsType<NotFoundObjectResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnBadRequestIfTaskAlreadyHasAnswerAdded(
        [Frozen] Mock<ITaskRepository> taskRepository,
        [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository,
        Mock<IFormFile> formFile,
        ApplicationTask task,
        TaskAnswer answer,
        CreateTaskAnswerDto dto)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync(answer);

            var result = await sut.Create(6, formFile.Object, dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskAnswerDto>>(result);
            Assert.IsType<BadRequestObjectResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnBadRequestIfTaskDeadlineHasPassed(
        [Frozen] Mock<ITaskRepository> taskRepository,
        [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository,
        Mock<IFormFile> formFile,
        ApplicationTask task,
        CreateTaskAnswerDto dto)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            task.Deadline = DateTime.MinValue;
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((TaskAnswer)null);

            var result = await sut.Create(6, formFile.Object, dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskAnswerDto>>(result);
            Assert.IsType<BadRequestObjectResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task UpdateTaskAsSubmitedOnSuccessfullAnswerAdd(
        [Frozen] Mock<ITaskRepository> taskRepository,
        [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository,
        Mock<IFormFile> formFile,
        ApplicationTask task,
        CreateTaskAnswerDto dto)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            task.Deadline = DateTime.MaxValue;
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync((TaskAnswer)null);

            var result = await sut.Create(6, formFile.Object, dto);

            taskRepository.Verify(s => s.UpdateAsync(It.Is<ApplicationTask>(t => t.AnswerSubmited == true)), Times.Once);
        }


        [Theory]
        [AutoData]
        public async Task DownloadTaskAnswerFile(
             ApplicationTask task,
             TaskAnswer answer,
             [Frozen] Mock<ITaskRepository> taskRepository,
             [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync(answer);

            var result = await sut.DownloadResume(6);

            var fileResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(answer.FileName, fileResult.FileDownloadName);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindTaskWhenDownloadingFile(
          TaskAnswer answer,
          [Frozen] Mock<ITaskRepository> taskRepository,
          [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((ApplicationTask)null);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync(answer);

            var result = await sut.DownloadResume(6);

            var fileResult = Assert.IsType<NotFoundObjectResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindTaskAnswerWhenDownloadingFile(
        ApplicationTask task,
        [Frozen] Mock<ITaskRepository> taskRepository,
        [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync((TaskAnswer)null);

            var result = await sut.DownloadResume(6);

            var fileResult = Assert.IsType<NotFoundObjectResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfFileDataIsNullWhenDownloadingFile(
            ApplicationTask task,
            TaskAnswer answer,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            answer.FileData = null;
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync(answer);

            var result = await sut.DownloadResume(6);

            var fileResult = Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindTaskAnswerWhenGettingTaskAnswer(
            ApplicationTask task,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync((TaskAnswer)null);

            var result = await sut.GetTaskAnswer(6);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskAnswerDto>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindTaskWhenGettingTaskAnswer(
          [Frozen] Mock<ITaskRepository> taskRepository,
          [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((ApplicationTask)null);

            var result = await sut.GetTaskAnswer(6);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskAnswerDto>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }


        [Theory]
        [AutoData]
        public async Task ReturnOkResultWhenSuccessfullyReturnedTaskAnswer(
            TaskAnswer answer, 
            ApplicationTask task,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<ITaskAnswerRepository> taskAnswerRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskAnswerController(taskRepository.Object, taskAnswerRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            taskAnswerRepository.Setup(s => s.GetTaskAnswerAsync(It.IsAny<int>())).ReturnsAsync(answer);

            var result = await sut.GetTaskAnswer(6);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskAnswerDto>>(result);
            Assert.IsType<OkObjectResult>(resultType.Result);
        }
    }
}

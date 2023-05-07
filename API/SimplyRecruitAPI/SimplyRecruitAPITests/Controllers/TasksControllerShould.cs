using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Moq;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Tasks;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class TasksControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnCreatedResultWhenSuccessfullyCreatedTask(
            [Frozen] Mock<ITaskRepository> taskRepository,
            Application application,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository,
            Mock<IFormFile> formFile,
            ApplicationTask task,
            CreateTaskDto dto)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(application);

            var result = await sut.Create(6, formFile.Object, dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskDto>>(result);
            Assert.IsType<CreatedResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundWhenCouldNotFindApplicationToAddTaskTo(
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository,
            Mock<IFormFile> formFile,
            CreateTaskDto dto)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((ApplicationTask)null!);

            var result = await sut.Create(6, formFile.Object, dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskDto>>(result);
            Assert.IsType<NotFoundObjectResult>(resultType.Result);
        }


        [Theory]
        [AutoData]
        public async Task DownloadTaskFile(
             ApplicationTask task,
             Application application,
             [Frozen] Mock<ITaskRepository> taskRepository,
             [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(application);

            var result = await sut.DownloadResume(6, 6);

            var fileResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(task.FileName, fileResult.FileDownloadName);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplicationWhenDownloadingFile(
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null!);

            var result = await sut.DownloadResume(6, 6);

            var fileResult = Assert.IsType<NotFoundObjectResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindTaskWhenDownloadingFile(
            Application application,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((ApplicationTask)null!);

            var result = await sut.DownloadResume(6, 6);

            var fileResult = Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfFileDataIsNullWhenDownloadingFile(
            Application application,
            ApplicationTask task,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            task.FileData = null;
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);

            var result = await sut.DownloadResume(6, 6);

            var fileResult = Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplicationWhenGettingItsTasks(
            ApplicationTask task,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            task.FileData = null;
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null!);

            var result = await sut.GetApplicationTasks(6);

            var resultType = Assert.IsAssignableFrom<ActionResult<IEnumerable<TaskDto>>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplicationWhenGettingTask(
            ApplicationTask task,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            task.FileData = null;
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null!);

            var result = await sut.GetTask(6, 6);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskDto>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindTaskWhenGettingTask(
            ApplicationTask task,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            task.FileData = null;
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null!);

            var result = await sut.GetTask(6, 6);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskDto>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnOkResultWhenGetTasksWasSuccessfull(
            Application application,
            IEnumerable<ApplicationTask> tasks,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            taskRepository.Setup(s => s.GetApplicationsManyAsync(It.IsAny<int>())).ReturnsAsync(tasks.ToList());

            var result = await sut.GetApplicationTasks(6);

            var resultType = Assert.IsAssignableFrom<ActionResult<IEnumerable<TaskDto>>>(result);
            Assert.IsType<OkObjectResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnOkResultWhenGettingTask(
            Application application,
            ApplicationTask task,
            [Frozen] Mock<ITaskRepository> taskRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new TaskController(taskRepository.Object, applicationsRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            taskRepository.Setup(s => s.GetAsync(It.IsAny<int>())).ReturnsAsync(task);

            var result = await sut.GetTask(6, 6);

            var resultType = Assert.IsAssignableFrom<ActionResult<TaskDto>>(result);
            Assert.IsType<OkObjectResult>(resultType.Result);
        }
    }
}

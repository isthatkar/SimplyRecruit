using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Positions;
using SimplyRecruitAPI.Data.Dtos.Projects;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class ProjectsControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnAllProjects(
            IEnumerable<Project> projects,
            [Frozen] Mock<IProjectsRepository> projectsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectsController(projectsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            projectsRepository.Setup(x => x.GetManyAsync()).ReturnsAsync(projects.ToList());

            var result = await sut.GetMany();

            Assert.Equal(projects.Count(), result.Count());
        }

        [Theory]
        [AutoData]
        public async Task ReturnProjectById(
          Project project,
          [Frozen] Mock<IProjectsRepository> projectsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectsController(projectsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(project);

            var result = await sut.Get(5);

            var actualItem = Assert.IsAssignableFrom<ActionResult<ProjectDto>>(result);
            Assert.Equal(actualItem.Value.Id, project.Id);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldntFindProjectById(
         [Frozen] Mock<IProjectsRepository> projectsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectsController(projectsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Project)null);

            var result = await sut.Get(5);

            var resultType = Assert.IsAssignableFrom<ActionResult<ProjectDto>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnCreatedResultWhenProjectCreatedSuccessfully(
            CreateProjectDto dto,
            [Frozen] Mock<IProjectsRepository> projectsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectsController(projectsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            var result = await sut.Create(dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<ProjectDto>>(result);
            Assert.IsType<CreatedResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnOkResultWhenProjectEditedSuccessfully(
            UpdateProjectDto dto,
            Project project,
            [Frozen] Mock<IProjectsRepository> projectsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectsController(projectsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(project);

            var result = await sut.Update(project.Id, dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<Project>>(result);
            Assert.IsType<OkObjectResult>(resultType.Result);
            projectsRepository.Verify(s => s.UpdateAsync(It.Is<Project>(p => p.Id == project.Id)), Times.Once);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundWhenCannotFindProjectToEdit(
           UpdateProjectDto dto,
           Project project,
           [Frozen] Mock<IProjectsRepository> projectsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectsController(projectsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Project)null);

            var result = await sut.Update(project.Id, dto);

            var resultType = Assert.IsAssignableFrom<ActionResult<Project>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundWhenCannotFindProjectToRemove(
           Project project,
           [Frozen] Mock<IProjectsRepository> projectsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectsController(projectsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Project)null);

            var result = await sut.Remove(project.Id);

            Assert.IsAssignableFrom<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNoContentWhenSuccessullyRemovedProject(
           Project project,
           [Frozen] Mock<IProjectsRepository> projectsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectsController(projectsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(project);

            var result = await sut.Remove(project.Id);

            Assert.IsAssignableFrom<NoContentResult>(result);
            projectsRepository.Verify(s => s.DeleteAsync(It.Is<Project>(p => p.Id == project.Id)), Times.Once);
        }
    }
}

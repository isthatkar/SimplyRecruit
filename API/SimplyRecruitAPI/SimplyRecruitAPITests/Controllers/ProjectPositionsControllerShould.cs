using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Positions;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class ProjectPositionsControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnProjectPositions(
            Project project,
            IEnumerable<Position> positions,
            [Frozen] Mock<IProjectsRepository> projectsRepository,
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectPositionsController(projectsRepository.Object, positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            var returnItems = positions.ToList();
            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(project);
            positionsRepository.Setup(x => x.GetProjectsManyAsync(project.Id)).ReturnsAsync(returnItems);

            var result = await sut.GetProjectsPositions(project.Id);

            var okObjectResult = result.Result as OkObjectResult;
            var appDto = okObjectResult!.Value as IEnumerable<ProjectPositionDto>;
            Assert.Equal(returnItems.Count, appDto!.Count());
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindProjectOfWhichPositionsToReturn(
            Project project,
            [Frozen] Mock<IProjectsRepository> projectsRepository,
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectPositionsController(projectsRepository.Object, positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Project)null!);

            var result = await sut.GetProjectsPositions(project.Id);

            var resultType = Assert.IsAssignableFrom<ActionResult<IEnumerable<ProjectPositionDto>>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindProjectToCreatePositionIn(
            Project project,
            CreatePositionDto positionDto,
            [Frozen] Mock<IProjectsRepository> projectsRepository,
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectPositionsController(projectsRepository.Object, positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Project)null!);

            var result = await sut.Create(project.Id, positionDto);

            var resultType = Assert.IsAssignableFrom<ActionResult<PositionDto>>(result);
            Assert.IsType<NotFoundObjectResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnCreatedWhenSuccessfullyCreatedPosition(
            Project project,
            CreatePositionDto positionDto,
            [Frozen] Mock<IProjectsRepository> projectsRepository,
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ProjectPositionsController(projectsRepository.Object, positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            projectsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(project);

            var result = await sut.Create(project.Id, positionDto);

            var resultType = Assert.IsAssignableFrom<ActionResult<PositionDto>>(result);
            Assert.IsType<CreatedResult>(resultType.Result);
            positionsRepository.Verify(s => s.CreateAsync(It.IsAny<Position>()), Times.Once);
        }
    }
}

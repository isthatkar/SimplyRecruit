using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static SimplyRecruitAPI.Data.Dtos.Applications.ApplicationsDtos;

namespace SimplyRecruitAPITests.Controllers
{
    public class PositionApplicationsControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnPositionsApplications(
            Position position,
            IEnumerable<Application> applications,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository,
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionApplicationsController(applicationsRepository.Object, positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            var returnItems = applications.ToList();
            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(position);
            applicationsRepository.Setup(x => x.GetAllPositionsApplicationsAsync(position.Id)).ReturnsAsync(returnItems);

            var result = await sut.GetPositionsApplications(position.Id);

            var okObjectResult = result.Result as OkObjectResult;
            var appDto = okObjectResult!.Value as IEnumerable<PositionApplicationDto>;
            Assert.Equal(returnItems.Count, appDto!.Count());
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindPositionToGetApplicationsOf(
            [Frozen] Mock<IApplicationsRepository> applicationsRepository,
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionApplicationsController(applicationsRepository.Object, positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Position)null!);

            var result = await sut.GetPositionsApplications(56);

            var notFoundResult = Assert.IsType<ActionResult<IEnumerable<PositionApplicationDto>>>(result);
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindPositionWhenCreatingApplication(
            CreateApplicationDto createDto,
           [Frozen] Mock<IApplicationsRepository> applicationsRepository,
           [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionApplicationsController(applicationsRepository.Object, positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Position)null!);

            var result = await sut.Create(56, createDto);

            var notFoundResult = Assert.IsType<ActionResult<ApplicationDto>>(result);
            Assert.IsType<NotFoundObjectResult>(notFoundResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnCreatedResultWhenSuccessfullyCreatedApplicationToPosition(
            CreateApplicationDto createDto,
            Position position,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository,
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionApplicationsController(applicationsRepository.Object, positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(position);

            var result = await sut.Create(56, createDto);

            var notFoundResult = Assert.IsType<ActionResult<ApplicationDto>>(result);
            Assert.IsType<CreatedResult>(notFoundResult.Result);
            applicationsRepository.Verify(s => s.CreateAsync(It.IsAny<Application>()), Times.Once);
        }
    }
}

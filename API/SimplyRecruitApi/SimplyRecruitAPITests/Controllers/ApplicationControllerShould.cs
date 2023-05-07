using Moq;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using SimplyRecruitAPI.Data.Entities;
using AutoFixture.Xunit2;
using static SimplyRecruitAPI.Data.Dtos.Applications.ApplicationsDtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;

namespace SimplyRecruitAPITests.Controllers
{
    public class ApplicationControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnAllApplications(
            IEnumerable<Application> items,
            [Frozen] Mock<IApplicationsRepository> applicationRepository)
        {
            var sut = new ApplicationsController(applicationRepository.Object);
            var returnItems = items.ToList();
            applicationRepository.Setup(x => x.GetManyAsync()).ReturnsAsync(returnItems);

            var result = await sut.GetMany();

            Assert.Equal(returnItems.Count, result.Count());
        }

        [Theory]
        [AutoData]
        public async Task ReturnApplication(
           Application application,
           int applicationId,
           [Frozen] Mock<IApplicationsRepository> applicationRepository)
        {
            var sut = new ApplicationsController(applicationRepository.Object);
            applicationRepository.Setup(x => x.GetAsync(applicationId)).ReturnsAsync(application);

            var result = await sut.Get(applicationId);

            var actualItem = Assert.IsAssignableFrom<ActionResult<ApplicationDto>>(result);
            Assert.Equal(actualItem.Value.Id, application.Id);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfApplicationNotFound(
           int applicationId,
           [Frozen] Mock<IApplicationsRepository> applicationRepository)
        {
            var sut = new ApplicationsController(applicationRepository.Object);
            applicationRepository.Setup(x => x.GetAsync(applicationId)).ReturnsAsync((Application)null);

            var result = await sut.Get(applicationId);

            var notFoundResult = Assert.IsType<ActionResult<ApplicationDto>>(result);
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnCurrentUsersApplications(
           IEnumerable<Application> items,
           [Frozen] Mock<IApplicationsRepository> applicationRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ApplicationsController(applicationRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            var returnItems = items.ToList();
            applicationRepository.Setup(x => x.GetAllUsersApplicationsAsync(userId)).ReturnsAsync(returnItems);

            var result = await sut.GetCurrentUsersApplications();

            Assert.Equal(returnItems.Count, result.Count());
        }

        [Theory]
        [AutoData]
        public async Task ReturnOkayResultIfUpdateSuccessfull(
            Application application,
            UpdateApplicationDto updateApplicationDto,
            [Frozen] Mock<IApplicationsRepository> applicationRepository)
        {
            var sut = new ApplicationsController(applicationRepository.Object);
            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync(application);

            var result = await sut.Update(application.Id, updateApplicationDto);

            var okResult = Assert.IsType<ActionResult<Application>>(result);
            Assert.IsType<OkObjectResult>(okResult.Result);
            applicationRepository.Verify(x => x.UpdateAsync(It.IsAny<Application>()), Times.Once);
        }

        [Theory]
        [AutoData]
        public async Task Return404IfCouldNotFindApplicationToUpdate(
            Application application,
            UpdateApplicationDto updateApplicationDto,
            [Frozen] Mock<IApplicationsRepository> applicationRepository)
        {
            var sut = new ApplicationsController(applicationRepository.Object);
            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync((Application)null);

            var result = await sut.Update(application.Id, updateApplicationDto);

            var okResult = Assert.IsType<ActionResult<Application>>(result);
            Assert.IsType<NotFoundResult>(okResult.Result);
            applicationRepository.Verify(x => x.UpdateAsync(It.IsAny<Application>()), Times.Never);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplicationToRemove(
            Application application,
            [Frozen] Mock<IApplicationsRepository> applicationRepository)
        {
            var sut = new ApplicationsController(applicationRepository.Object);
            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync((Application)null);

            var result = await sut.Remove(application.Id);

            var notFoundResult = Assert.IsAssignableFrom<ActionResult>(result);
            Assert.IsType<NotFoundResult>(result);
            applicationRepository.Verify(x => x.DeleteAsync(It.IsAny<Application>()), Times.Never);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNoContentWhenDeletedApplication(
            Application application,
            [Frozen] Mock<IApplicationsRepository> applicationRepository)
        {
            var sut = new ApplicationsController(applicationRepository.Object);
            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync(application);

            var result = await sut.Remove(application.Id);

            var noContentResult = Assert.IsAssignableFrom<ActionResult>(result);
            Assert.IsType<NoContentResult>(result);
            applicationRepository.Verify(x => x.DeleteAsync(It.IsAny<Application>()), Times.Once);
        }
    }
}

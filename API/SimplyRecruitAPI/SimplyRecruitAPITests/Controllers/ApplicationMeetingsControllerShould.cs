using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Moq;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Meetings;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class ApplicationMeetingsControllerShould
    {
        [Theory]
        [AutoData]
        public async Task Return404IfCouldNotFindApplicationToGetMeetingsOf(
        Application application,
        [Frozen] Mock<IApplicationsRepository> applicationRepository,
        [Frozen] Mock<IMeetingsRepository> meetingsRepository,
        [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));

            var sut = new ApplicationsMeetingsController(meetingsRepository.Object, applicationRepository.Object, meetingTimesRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync((Application)null);

            var result = await sut.GetApplicationMeetings(application.Id);

            var notFoundResult = Assert.IsType<ActionResult<IEnumerable<MeetingDto>>>(result);
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnAllApplicationsMeetings(
         IEnumerable<Meeting> items,
         Application application,
         [Frozen] Mock<IApplicationsRepository> applicationRepository,
         [Frozen] Mock<IMeetingsRepository> meetingsRepository,
         [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));

            var sut = new ApplicationsMeetingsController(meetingsRepository.Object, applicationRepository.Object, meetingTimesRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            var returnItems = items.ToList();
            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync(application);
            meetingsRepository.Setup(x => x.GetApplicationsManyAsync(application.Id)).ReturnsAsync(returnItems);

            var result = await sut.GetApplicationMeetings(application.Id);

            var okObjectResult = result.Result as OkObjectResult;
            var meetingsDto = okObjectResult.Value as IEnumerable<MeetingDto>;
            Assert.Equal(returnItems.Count, meetingsDto.Count());
        }

        [Theory]
        [AutoData]
        public async Task Return404IfCouldNotFindApplicationToCreateMeetingTo(
        Application application,
        CreateMeetingDto createMeetingDto,
        [Frozen] Mock<IApplicationsRepository> applicationRepository,
        [Frozen] Mock<IMeetingsRepository> meetingsRepository,
        [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
           
            var sut = new ApplicationsMeetingsController(meetingsRepository.Object, applicationRepository.Object, meetingTimesRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync((Application)null);

            var result = await sut.Create(application.Id, createMeetingDto);

            var notFoundResult = Assert.IsType<ActionResult<MeetingDtoWithTimes>>(result);
            Assert.IsType<NotFoundObjectResult>(notFoundResult.Result);
            meetingsRepository.Verify(x => x.CreateAsync(It.IsAny<Meeting>()), Times.Never);
        }

        [Theory]
        [AutoData]
        public async Task CreateMeetingAndReturnSuccessIfMeetingCreatedSuccessfuly(
        Application application,
        CreateMeetingDto createMeetingDto,
        [Frozen] Mock<IApplicationsRepository> applicationRepository,
        [Frozen] Mock<IMeetingsRepository> meetingsRepository,
        [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));

            var sut = new ApplicationsMeetingsController(meetingsRepository.Object, applicationRepository.Object, meetingTimesRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync(application);

            var result = await sut.Create(application.Id, createMeetingDto);

            var okResult = Assert.IsType<ActionResult<MeetingDtoWithTimes>>(result);
            Assert.IsType<CreatedResult>(okResult.Result);
            meetingsRepository.Verify(x => x.CreateAsync(It.IsAny<Meeting>()), Times.Once);
        }

        [Theory]
        [AutoData]
        public async Task AddEachMeetingTimeToMeetingTimes(
       Application application,
       CreateMeetingDto createMeetingDto,
       [Frozen] Mock<IApplicationsRepository> applicationRepository,
       [Frozen] Mock<IMeetingsRepository> meetingsRepository,
       [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));

            var sut = new ApplicationsMeetingsController(meetingsRepository.Object, applicationRepository.Object, meetingTimesRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationRepository.Setup(r => r.GetAsync(application.Id)).ReturnsAsync(application);

            var result = await sut.Create(application.Id, createMeetingDto);

            meetingTimesRepository.Verify(x => x.CreateAsync(It.IsAny<MeetingTimes>()), Times.Exactly(createMeetingDto.MeetingTimes.Length));
        }
    }
}

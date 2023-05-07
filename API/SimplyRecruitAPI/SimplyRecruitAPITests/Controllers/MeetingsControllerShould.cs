using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Moq;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Meetings;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class MeetingsControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnCurrentUsersMeetings(
            IEnumerable<Meeting> items,
            SimplyUser userToReturn,
            IEnumerable<MeetingTimes> times,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingsController(meetingsRepository.Object, meetingTimesRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            var returnItems = items.ToList();
            meetingsRepository.Setup(x => x.GetUsersManyAsync(userToReturn.Email)).ReturnsAsync(returnItems);
            meetingTimesRepository.Setup(x => x.GetMeetingsManyAsync(It.IsAny<int>())).ReturnsAsync(times.ToList());

            var result = await sut.GetUsersMany();

            Assert.Equal(returnItems.Count, result.Count());
        }

        [Theory]
        [AutoData]
        public async Task ReturnMeetingById(
            Meeting meeting,
            SimplyUser userToReturn,
            IEnumerable<MeetingTimes> times,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingsController(meetingsRepository.Object, meetingTimesRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetAsync(meeting.Id)).ReturnsAsync(meeting);
            meetingTimesRepository.Setup(x => x.GetMeetingsManyAsync(It.IsAny<int>())).ReturnsAsync(times.ToList());

            var result = await sut.GetMeeting(meeting.Id);

            var actualItem = Assert.IsAssignableFrom<ActionResult<MeetingDto>>(result);
            Assert.Equal(actualItem.Value!.Id, meeting.Id);
        }


        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindMeetingById(
            SimplyUser userToReturn,
            IEnumerable<MeetingTimes> times,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingsController(meetingsRepository.Object, meetingTimesRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Meeting)null!);
            meetingTimesRepository.Setup(x => x.GetMeetingsManyAsync(It.IsAny<int>())).ReturnsAsync(times.ToList());

            var result = await sut.GetMeeting(5);

            var notFoundResult = Assert.IsType<ActionResult<MeetingDto>>(result);
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnMeetingByUrk(
            Meeting meeting,
            SimplyUser userToReturn,
            IEnumerable<MeetingTimes> times,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingsController(meetingsRepository.Object, meetingTimesRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetByUrlAsync(meeting.SchedullingUrl!)).ReturnsAsync(meeting);
            meetingTimesRepository.Setup(x => x.GetMeetingsManyAsync(It.IsAny<int>())).ReturnsAsync(times.ToList());

            var result = await sut.GetMeetingByUrl(meeting.SchedullingUrl!);

            var actualItem = Assert.IsAssignableFrom<ActionResult<MeetingDto>>(result);
            Assert.Equal(actualItem.Value!.Id, meeting.Id);
        }


        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindMeetingByUrl(
            SimplyUser userToReturn,
            IEnumerable<MeetingTimes> times,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingsController(meetingsRepository.Object, meetingTimesRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetByUrlAsync(It.IsAny<string>())).ReturnsAsync((Meeting)null!);
            meetingTimesRepository.Setup(x => x.GetMeetingsManyAsync(It.IsAny<int>())).ReturnsAsync(times.ToList());

            var result = await sut.GetMeetingByUrl("veryrandomurl");

            var notFoundResult = Assert.IsType<ActionResult<MeetingDto>>(result);
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindMeetingToUpdate(
            SimplyUser userToReturn,
            IEnumerable<MeetingTimes> times,
            UpdateMeetingDto updateMeetingDto,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingsController(meetingsRepository.Object, meetingTimesRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Meeting)null!);
            meetingTimesRepository.Setup(x => x.GetMeetingsManyAsync(It.IsAny<int>())).ReturnsAsync(times.ToList());

            var result = await sut.Update(5, updateMeetingDto);

            var notFoundResult = Assert.IsType<ActionResult<MeetingDto>>(result);
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }


        [Theory]
        [AutoData]
        public async Task ReturnOkayResultIfUpdateSuccessfull(
            Meeting meeting,
            SimplyUser userToReturn,
            IEnumerable<MeetingTimes> times,
            UpdateMeetingDto updateMeetingDto,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingsController(meetingsRepository.Object, meetingTimesRepository.Object, userManager.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(meeting);
            meetingTimesRepository.Setup(x => x.GetMeetingsManyAsync(It.IsAny<int>())).ReturnsAsync(times.ToList());

            var result = await sut.Update(5, updateMeetingDto);


            var okResult = Assert.IsType<ActionResult<MeetingDto>>(result);
            Assert.IsType<OkObjectResult>(okResult.Result);
            meetingsRepository.Verify(x => x.UpdateAsync(It.IsAny<Meeting>()), Times.Once);
        }
    }
}

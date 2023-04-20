using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Meetings;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class MeetingTimesControllerShould
    {

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindMeetingByIdWhenSelectingMeetingTimes(
            SimplyUser userToReturn,
            SelectMeetingTimesDto dto,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingTimesController(meetingTimesRepository.Object, userManager.Object, meetingsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Meeting)null);

            var result = await sut.Select(dto);

            Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindMeetingTimesByIdWhenSelectingMeetingTimes(
            SimplyUser userToReturn,
            SelectMeetingTimesDto dto,
            Meeting meeting,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingTimesController(meetingTimesRepository.Object, userManager.Object, meetingsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(meeting);
            meetingTimesRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((MeetingTimes)null);


            var result = await sut.Select(dto);

            Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task EditEachSelectedTimesAndReturnSuccessResult(
            SimplyUser userToReturn,
            SelectMeetingTimesDto dto,
            Meeting meeting,
            MeetingTimes time,
            [Frozen] Mock<IMeetingsRepository> meetingsRepository,
            [Frozen] Mock<IMeetingTimesRepository> meetingTimesRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new MeetingTimesController(meetingTimesRepository.Object, userManager.Object, meetingsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            meetingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(meeting);
            meetingTimesRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(time);

            var result = await sut.Select(dto);

            meetingTimesRepository.Verify(x => x.UpdateAsync(It.Is<MeetingTimes>(t => t.SelectedAttendees.Contains(userToReturn.Email))), Times.Exactly(dto.Ids.Length));
            Assert.IsType<OkResult>(result);
        }
    }
}

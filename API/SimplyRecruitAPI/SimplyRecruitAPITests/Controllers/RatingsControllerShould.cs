using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Ratings;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class RatingsControllerShould
    {
        [Theory]
        [AutoData]
        public async Task CreateRatingForApplication(
         SimplyUser userToReturn,
         Application application,
         AddRatingDto dto,
         IEnumerable<Rating> ratings, 
         [Frozen] Mock<IRatingsRepository> ratingsRepository,
         [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            ratingsRepository.Setup(x => x.GetApplicationRatings(It.IsAny<int>())).ReturnsAsync(ratings.ToList());

            var result = await sut.Create(6, dto);

            var okResult = Assert.IsType<ActionResult<RatingDto>>(result);
            Assert.IsType<CreatedResult>(okResult.Result);
            ratingsRepository.Verify(x => x.CreateAsync(It.IsAny<Rating>()), Times.Once);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplicationToAddRatingTo(
        SimplyUser userToReturn,
        AddRatingDto dto,
        IEnumerable<Rating> ratings,
        [Frozen] Mock<IRatingsRepository> ratingsRepository,
        [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null);
            ratingsRepository.Setup(x => x.GetApplicationRatings(It.IsAny<int>())).ReturnsAsync(ratings.ToList());

            var result = await sut.Create(6, dto);

            var okResult = Assert.IsType<ActionResult<RatingDto>>(result);
            Assert.IsType<NotFoundObjectResult>(okResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnApplicationsMeetings(
            IEnumerable<Rating> items,
            SimplyUser userToReturn,
            [Frozen] Mock<IRatingsRepository> ratingsRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            ratingsRepository.Setup(x => x.GetApplicationRatings(It.IsAny<int>())).ReturnsAsync(items.ToList());

            var result = await sut.GetApplicationsMany(6);

            Assert.Equal(result.Count(), result.Count());
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindRatingToUpdate(
            SimplyUser userToReturn,
            Application application,
            UpdateRatingDto dto,
            [Frozen] Mock<IRatingsRepository> ratingsRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            ratingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Rating)null);

            var result = await sut.Update(6, 6, dto);

            var okResult = Assert.IsType<ActionResult<RatingDto>>(result);
            Assert.IsType<NotFoundResult>(okResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplicationRatingToUpdate(
           SimplyUser userToReturn,
           Rating rating,
           UpdateRatingDto dto,
           [Frozen] Mock<IRatingsRepository> ratingsRepository,
           [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null);
            ratingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(rating);

            var result = await sut.Update(6, 6, dto);

            var okResult = Assert.IsType<ActionResult<RatingDto>>(result);
            Assert.IsType<NotFoundResult>(okResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnOkResultIfRatingUpdatesSuccessfully(
           SimplyUser userToReturn,
           IEnumerable<Rating> items,
           Rating rating,
           Application application,
           UpdateRatingDto dto,
           [Frozen] Mock<IRatingsRepository> ratingsRepository,
           [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            ratingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(rating);
            ratingsRepository.Setup(x => x.GetApplicationRatings(It.IsAny<int>())).ReturnsAsync(items.ToList());

            var result = await sut.Update(6, 6, dto);

            var okResult = Assert.IsType<ActionResult<RatingDto>>(result);
            Assert.IsType<OkObjectResult>(okResult.Result);
            ratingsRepository.Verify(x => x.UpdateAsync(It.IsAny<Rating>()), Times.Once);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindRatingToDelete(
            SimplyUser userToReturn,
            Application application,
            [Frozen] Mock<IRatingsRepository> ratingsRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            ratingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Rating)null);

            var result = await sut.Remove(6, 6);

            var okResult = Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplicationRatingToDelete(
           SimplyUser userToReturn,
           Rating rating,
           [Frozen] Mock<IRatingsRepository> ratingsRepository,
           [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null);
            ratingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(rating);

            var result = await sut.Remove(6, 6);

            var okResult = Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNoContentIfRatingDeletdSuccessfuly(
           SimplyUser userToReturn,
           IEnumerable<Rating> items,
           Rating rating,
           Application application,
           [Frozen] Mock<IRatingsRepository> ratingsRepository,
           [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userManager = new Mock<UserManager<SimplyUser>>(new Mock<IUserStore<SimplyUser>>().Object, null, null, null, null, null, null, null, null);

            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new RatingsController(ratingsRepository.Object, userManager.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            userManager.Setup(r => r.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(userToReturn);
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            ratingsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(rating);
            ratingsRepository.Setup(x => x.GetApplicationRatings(It.IsAny<int>())).ReturnsAsync(items.ToList());

            var result = await sut.Remove(6, 6);

            var okResult = Assert.IsType<NoContentResult>(result);
            ratingsRepository.Verify(x => x.DeleteAsync(It.IsAny<Rating>()), Times.Once);
        }
    }
}

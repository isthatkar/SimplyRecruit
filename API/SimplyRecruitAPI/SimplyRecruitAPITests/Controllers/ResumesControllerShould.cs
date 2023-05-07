using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Moq;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Resumes;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class ResumesControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplication(
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null!);

            var result = await sut.Get(6);

            var okResult = Assert.IsType<ActionResult<ResumeDto>>(result);
            Assert.IsType<NotFoundResult>(okResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindResume(
            Application application,
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            resumesRepository.Setup(x => x.GetApplicationResumeAsync(It.IsAny<int>())).ReturnsAsync((Resume)null!);


            var result = await sut.Get(6);

            var okResult = Assert.IsType<ActionResult<ResumeDto>>(result);
            Assert.IsType<NotFoundResult>(okResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnResume(
            Application application,
            Resume resume,
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            resumesRepository.Setup(x => x.GetApplicationResumeAsync(It.IsAny<int>())).ReturnsAsync(resume);


            var result = await sut.Get(6);

            var actualItem = Assert.IsAssignableFrom<ActionResult<ResumeDto>>(result);
            Assert.Equal(actualItem.Value.Id, resume.Id);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindResumeOnDownload(
            Application application,
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            resumesRepository.Setup(x => x.GetApplicationResumeAsync(It.IsAny<int>())).ReturnsAsync((Resume)null!);


            var result = await sut.DownloadResume(6);

            Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task DownloadResumeFile(
            Application application,
            Resume resume,
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            resumesRepository.Setup(x => x.GetApplicationResumeAsync(It.IsAny<int>())).ReturnsAsync(resume);


            var result = await sut.DownloadResume(6);

            var fileResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(resume.FileName, fileResult.FileDownloadName);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfCouldNotFindApplicationOnAddResume(
            Mock<IFormFile> file,
            CreateResumeDto dto,
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Application)null!);

            var result = await sut.Create(6, file.Object, dto);

            var okResult = Assert.IsType<ActionResult<ResumeDto>>(result);
            Assert.IsType<NotFoundResult>(okResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnUnauthorizedIfUserThatsTryingToAddResumeDidNotCreateApplication(
            Mock<IFormFile> file,
            Application application,
            Resume resume,
            CreateResumeDto dto,
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            resumesRepository.Setup(x => x.GetApplicationResumeAsync(It.IsAny<int>())).ReturnsAsync(resume);

            var result = await sut.Create(6, file.Object, dto);

            var okResult = Assert.IsType<ActionResult<ResumeDto>>(result);
            Assert.IsType<UnauthorizedResult>(okResult.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnBadRequestIfApplicationAlreadyHasAResume(
            Mock<IFormFile> file,
            Application application,
            Resume resume,
            CreateResumeDto dto,
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = application.UserId;
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            resumesRepository.Setup(x => x.GetApplicationResumeAsync(It.IsAny<int>())).ReturnsAsync(resume);

            var result = await sut.Create(6, file.Object, dto);

            var okResult = Assert.IsType<ActionResult<ResumeDto>>(result);
            Assert.IsType<BadRequestObjectResult>(okResult.Result);
        }


        [Theory]
        [AutoData]
        public async Task ReturnCreatedResultIfResumeAddedSuccessfully(
            Mock<IFormFile> file,
            Application application,
            CreateResumeDto dto,
            [Frozen] Mock<IResumesRepository> resumesRepository,
            [Frozen] Mock<IApplicationsRepository> applicationsRepository)
        {
            var userId = application.UserId;
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new ResumesController(resumesRepository.Object, applicationsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
            applicationsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(application);
            resumesRepository.Setup(x => x.GetApplicationResumeAsync(It.IsAny<int>())).ReturnsAsync((Resume)null!);

            var result = await sut.Create(6, file.Object, dto);

            var okResult = Assert.IsType<ActionResult<ResumeDto>>(result);
            Assert.IsType<CreatedResult>(okResult.Result);
        }
    }
}

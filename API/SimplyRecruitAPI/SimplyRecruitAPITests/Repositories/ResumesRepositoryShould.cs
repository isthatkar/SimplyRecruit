using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using AutoFixture;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data;

namespace SimplyRecruitAPITests.Repositories
{
    public class ResumesRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly ResumesRepository sut;

        public ResumesRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new ResumesRepository(DbContext);
        }

        [Theory]
        [AutoData]

        public async Task AddResumeToDatabase(Resume resume)
        {
            await sut.CreateAsync(resume);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Resumes.Contains(resume));
            }
        }


        [Theory]
        [AutoData]
        public async Task RemoveResumeFromDatabase(Resume resume)
        {
            await sut.CreateAsync(resume);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Resumes.Contains(resume));
            }

            await sut.DeleteAsync(resume);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedResume = await dbContext.Resumes.FindAsync(resume.Id);
                Assert.Null(retrievedResume);
            }
        }

        [Theory]
        [AutoData]
        public async Task GetResumeByid(Resume resume)
        {
            await sut.CreateAsync(resume);
            var retrievedResume = await sut.GetAsync(resume.Id);

            Assert.NotNull(retrievedResume);
            Assert.Equal(retrievedResume!.Id, resume.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetApplicationsResume(Resume resume,
            Application application)
        {
           resume.Application = application;    
           await sut.CreateAsync(resume);
           
            var retrievedResume = await sut.GetApplicationResumeAsync(application.Id);

            Assert.Equal(retrievedResume!.Id, resume.Id);
        }
    }
}

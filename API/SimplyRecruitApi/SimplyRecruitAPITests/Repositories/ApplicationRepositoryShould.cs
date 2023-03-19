using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;

namespace SimplyRecruitAPITests.Repositories
{
    public class ApplicationRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly ApplicationsRepository sut;

        public ApplicationRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
           .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
           .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new ApplicationsRepository(DbContext);
        }

        [Fact]
        public async Task AddApplicationToDatabase()
        {
            var application = fixture.Create<Application>();

            await sut.CreateAsync(application);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Applications.Contains(application));
            }
        }

        [Fact]
        public async Task RemoveApplicationFromDatabase()
        {
            var application = fixture.Create<Application>();
            await sut.CreateAsync(application);

            await sut.DeleteAsync(application);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedProject = await dbContext.Applications.FindAsync(application.Id);
                Assert.Null(retrievedProject);
            }
        }

        [Fact]
        public async Task GetApplicationById()
        {
            var application = fixture.Create<Application>();
            await sut.CreateAsync(application);
            var retrievedApplication = await sut.GetAsync(application.Id);

            Assert.NotNull(retrievedApplication);
            Assert.Equal(application.Id, retrievedApplication!.Id);
        }

        [Fact]
        public async Task GetAllApplications()
        {
            var applications = fixture.CreateMany<Application>().ToList();
            foreach (var application in applications)
            {
                await sut.CreateAsync(application);
            }

            var retrievedApplications = await sut.GetManyAsync();

            Assert.Equal(applications.Count, retrievedApplications.Count());
        }


        [Theory]
        [AutoData]
        public async Task GetAllPositionsApplications(
            Position position,
            List<Application> positionApplications,
            List<Application> otherApplications)
        {
            foreach(Application application in positionApplications)
            {
                application.Position = position;
                await sut.CreateAsync(application);
            }

            foreach(Application application in otherApplications)
            {
                await sut.CreateAsync(application);
            }

            var result = await sut.GetAllPositionsApplicationsAsync(position.Id);

            Assert.Equal(positionApplications, result);
        }

        [Theory]
        [AutoData]
        public async Task GetAllUsersApplications(string userId,
            List<Application> userApplications,
            List<Application> otherApplications)
        {

            foreach (Application application in userApplications)
            {
                application.UserId = userId;
                await sut.CreateAsync(application);
            }

            foreach (Application application in otherApplications)
            {
                await sut.CreateAsync(application);
            }

            var result = await sut.GetAllUsersApplicationsAsync(userId);

            Assert.Equal(userApplications, result);
        }

        [Fact]
        public async Task UpdateApplication()
        {
            var application = fixture.Create<Application>();
            await sut.CreateAsync(application);
            application.ContactEmail = "changed@email.com";

            await sut.UpdateAsync(application);

            var updatedApplication = await sut.GetAsync(application.Id);
            Assert.Equal("changed@email.com", updatedApplication!.ContactEmail!);
        }
    }
}

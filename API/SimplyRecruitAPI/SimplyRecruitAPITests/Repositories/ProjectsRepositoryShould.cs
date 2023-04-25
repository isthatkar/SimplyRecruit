using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using AutoFixture;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data;

namespace SimplyRecruitAPITests.Repositories
{
    public class ProjectsRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly ProjectsRepository sut;

        public ProjectsRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
           .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
           .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new ProjectsRepository(DbContext);
        }

        [Theory]
        [AutoData]

        public async Task AddProjectToDatabase(Project project)
        {
            await sut.CreateAsync(project);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Projects.Contains(project));
            }
        }


        [Theory]
        [AutoData]
        public async Task RemoveProjectFromDatabase(Project project)
        {
            await sut.CreateAsync(project);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Projects.Contains(project));
            }

            await sut.DeleteAsync(project);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedProject = await dbContext.Projects.FindAsync(project.Id);
                Assert.Null(retrievedProject);
            }
        }

        [Theory]
        [AutoData]
        public async Task GetProjectById(Project project)
        {
            await sut.CreateAsync(project);
            var retrievedProject = await sut.GetAsync(project.Id);

            Assert.NotNull(retrievedProject);
            Assert.Equal(retrievedProject!.Id, project.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetAllProjects(IEnumerable<Project> projects)
        {
            foreach (var project in projects)
            {
                await sut.CreateAsync(project);
            }

            var retrievedProjects = await sut.GetManyAsync();

            Assert.Equal(retrievedProjects.Count(), projects.Count());
        }

        [Theory]
        [AutoData]
        public async Task UpdateProject(Project project)
        {
            await sut.CreateAsync(project);
            project.Description = "IReallyWantToGetThisDiploma";

            await sut.UpdateAsync(project);

            var updatedProject = await sut.GetAsync(project.Id);
            Assert.Equal("IReallyWantToGetThisDiploma", updatedProject!.Description!);
        }
    }
}

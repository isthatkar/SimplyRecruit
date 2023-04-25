using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using AutoFixture;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimplyRecruitAPITests.Repositories
{
    public class TaskRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly TaskRepository sut;

        public TaskRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new TaskRepository(DbContext);
        }

        [Theory]
        [AutoData]

        public async Task AddTaskToDatabase(ApplicationTask task)
        {
            await sut.CreateAsync(task);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Tasks.Contains(task));
            }
        }


        [Theory]
        [AutoData]
        public async Task RemoveTaskFromDataBase(ApplicationTask task)
        {
            await sut.CreateAsync(task);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Tasks.Contains(task));
            }

            await sut.DeleteAsync(task);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedResume = await dbContext.Tasks.FindAsync(task.Id);
                Assert.Null(retrievedResume);
            }
        }

        [Theory]
        [AutoData]
        public async Task GetTaskById(ApplicationTask task)
        {
            await sut.CreateAsync(task);
            var retrievedTask = await sut.GetAsync(task.Id);

            Assert.NotNull(retrievedTask);
            Assert.Equal(retrievedTask!.Id, task.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetAllApplicationsTasks(List<ApplicationTask> tasks,
            List<ApplicationTask> otherTasks,
            Application application)
        {
            foreach(ApplicationTask task in tasks)
            {
                task.Application = application;
                await sut.CreateAsync(task);
            }

            foreach (ApplicationTask task in otherTasks)
            {
                await sut.CreateAsync(task);
            }

            var retrievedTasks = await sut.GetApplicationsManyAsync(application.Id);

            Assert.Equal(retrievedTasks!.Count(), tasks.Count());
        }


        [Theory]
        [AutoData]
        public async Task UpdateTask(ApplicationTask task)
        {
            await sut.CreateAsync(task);
            task.Title = "IReallyWantToGetThisDiploma";

            await sut.UpdateAsync(task);

            var updatedTask = await sut.GetAsync(task.Id);
            Assert.Equal("IReallyWantToGetThisDiploma", updatedTask!.Title);
        }
    }
}

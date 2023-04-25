using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using AutoFixture;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data;

namespace SimplyRecruitAPITests.Repositories
{
    public class TaskAnswerRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly TaskAnswerRepository sut;

        public TaskAnswerRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new TaskAnswerRepository(DbContext);
        }

        [Theory]
        [AutoData]

        public async Task AddTaskAnswerToDatabase(TaskAnswer answer)
        {
            await sut.CreateAsync(answer);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.TaskAnswers.Contains(answer));
            }
        }


        [Theory]
        [AutoData]
        public async Task RemoveTaskAnswerFromDatabase(TaskAnswer answer)
        {
            await sut.CreateAsync(answer);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.TaskAnswers.Contains(answer));
            }

            await sut.DeleteAsync(answer);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedResume = await dbContext.TaskAnswers.FindAsync(answer.Id);
                Assert.Null(retrievedResume);
            }
        }

        [Theory]
        [AutoData]
        public async Task GetTaskAnswerById(TaskAnswer asnwer)
        {
            await sut.CreateAsync(asnwer);
            var retrievedAnswer = await sut.GetAsync(asnwer.Id);

            Assert.NotNull(retrievedAnswer);
            Assert.Equal(retrievedAnswer!.Id, asnwer.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetTaskAsnwer(TaskAnswer asnwer,
            ApplicationTask task)
        {
            asnwer.Task = task;
            await sut.CreateAsync(asnwer);

            var retrievedTaskAnswer = await sut.GetTaskAnswerAsync(task.Id);

            Assert.Equal(retrievedTaskAnswer!.Id, asnwer.Id);
        }
    }
}

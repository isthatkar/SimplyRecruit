using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using AutoFixture;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data;

namespace SimplyRecruitAPITests.Repositories
{
    public class PositionsRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly PositionsRepository sut;

        public PositionsRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
           .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
           .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new PositionsRepository(DbContext);
        }

        [Theory]
        [AutoData]

        public async Task AddPositionToDatabase(Position position)
        {
            await sut.CreateAsync(position);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Positions.Contains(position));
            }
        }


        [Theory]
        [AutoData]
        public async Task RemovePositionFromDatabase(Position position)
        {
            await sut.CreateAsync(position);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Positions.Contains(position));
            }

            await sut.DeleteAsync(position);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedProject = await dbContext.Positions.FindAsync(position.Id);
                Assert.Null(retrievedProject);
            }
        }

        [Theory]
        [AutoData]
        public async Task GetPositionById(Position position)
        {
            await sut.CreateAsync(position);
            var retrievedTime = await sut.GetAsync(position.Id);

            Assert.NotNull(retrievedTime);
            Assert.Equal(position.Id, retrievedTime!.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetAllPositions(IEnumerable<Position> positions)
        {
            foreach (var position in positions)
            {
                await sut.CreateAsync(position);
            }

            var retrievedPositions = await sut.GetManyAsync();

            Assert.Equal(retrievedPositions.Count(), positions.Count());
        }

        [Theory]
        [AutoData]
        public async Task GetAllProjectsPositions(IEnumerable<Position> positions,
            IEnumerable<Position> otherPositions,
            Project project)
        {
            foreach (var position in positions)
            {
                position.Project = project;
                await sut.CreateAsync(position);
            }

            foreach (var position in otherPositions)
            {
                await sut.CreateAsync(position);
            }

            var retrievedPositions = await sut.GetProjectsManyAsync(project.Id);

            Assert.Equal(retrievedPositions.Count(), positions.Count());
        }

        [Theory]
        [AutoData]
        public async Task UpdatePosition(Position position)
        {
            await sut.CreateAsync(position);
            position.Description = "thisIsTheNewPositionDescriptionIReallyHopeIWillFinishUniThisYear";

            await sut.UpdateAsync(position);

            var updatedTime = await sut.GetAsync(position.Id);
            Assert.Equal("thisIsTheNewPositionDescriptionIReallyHopeIWillFinishUniThisYear", updatedTime!.Description!);
        }
    }
}

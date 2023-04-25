using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using AutoFixture;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data;

namespace SimplyRecruitAPITests.Repositories
{
    public class RatingRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly RatingsRepository sut;

        public RatingRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new RatingsRepository(DbContext);
        }

        [Theory]
        [AutoData]

        public async Task AddRatingToDatabase(Rating rating)
        {
            await sut.CreateAsync(rating);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Ratings.Contains(rating));
            }
        }


        [Theory]
        [AutoData]
        public async Task RemoveRatingFromDatabase(Rating rating)
        {
            await sut.CreateAsync(rating);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Ratings.Contains(rating));
            }

            await sut.DeleteAsync(rating);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedProject = await dbContext.Ratings.FindAsync(rating.Id);
                Assert.Null(retrievedProject);
            }
        }

        [Theory]
        [AutoData]
        public async Task GetRatingById(Rating rating)
        {
            await sut.CreateAsync(rating);
            var retrievedRating = await sut.GetAsync(rating.Id);

            Assert.NotNull(retrievedRating);
            Assert.Equal(retrievedRating!.Id, rating.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetAllApplicationRating(IEnumerable<Rating> ratings,
            IEnumerable<Rating> otherRatings,
            Application application)
        {
            foreach (var rating in ratings)
            {
                rating.Application = application;
                await sut.CreateAsync(rating);
            }

            foreach (var rating in otherRatings)
            {
                await sut.CreateAsync(rating);
            }

            var retrievedRatings = await sut.GetApplicationRatings(application.Id);

            Assert.Equal(retrievedRatings.Count(), ratings.Count());
        }

        [Theory]
        [AutoData]
        public async Task UpdateRating(Rating rating)
        {
            await sut.CreateAsync(rating);
            rating.Comment = "IReallyWantToGetThisDiploma";

            await sut.UpdateAsync(rating);

            var updatedRating = await sut.GetAsync(rating.Id);
            Assert.Equal("IReallyWantToGetThisDiploma", updatedRating!.Comment);
        }
    }
}

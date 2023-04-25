using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using AutoFixture;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data;

namespace SimplyRecruitAPITests.Repositories
{
    public class MeetingsRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly MeetingsRepository sut;

        public MeetingsRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
           .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
           .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new MeetingsRepository(DbContext);
        }

        [Theory]
        [AutoData]

        public async Task AddMeetingToDatabase(Meeting meeting)
        {
            await sut.CreateAsync(meeting);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Meetings.Contains(meeting));
            }
        }


        [Theory]
        [AutoData]
        public async Task RemoveMeetingFromDatabase(Meeting meeting)
        {
            await sut.CreateAsync(meeting);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.Meetings.Contains(meeting));
            }

            await sut.DeleteAsync(meeting);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedProject = await dbContext.Meetings.FindAsync(meeting.Id);
                Assert.Null(retrievedProject);
            }
        }

        [Theory]
        [AutoData]
        public async Task GetMeetingById(Meeting meeting)
        {
            await sut.CreateAsync(meeting);
            var retrievedMeeting = await sut.GetAsync(meeting.Id);

            Assert.NotNull(retrievedMeeting);
            Assert.Equal(meeting.Id, retrievedMeeting!.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetAllApplicationsMeetings(IEnumerable<Meeting> meetings, 
            Application application)
        {
            foreach (var meet in meetings)
            {
                meet.Application = application;
                await sut.CreateAsync(meet);
            }

            var retrievedMeetings = await sut.GetApplicationsManyAsync(application.Id);

            Assert.Equal(meetings.Count(), retrievedMeetings.Count());
        }


        [Theory]
        [AutoData]
        public async Task GetAllUsersMeetings(
            string userId,
            List<Meeting> meetings,
            List<Meeting> otherMeetings)
        {
            foreach (Meeting meet in meetings)
            {
                meet.Atendees = userId;
                await sut.CreateAsync(meet);
            }

            foreach (Meeting meet in otherMeetings)
            {
                await sut.CreateAsync(meet);
            }

            var result = await sut.GetUsersManyAsync(userId);

            Assert.Equal(meetings.Count(), result.Count());
        }


        [Theory]
        [AutoData]
        public async Task UpdateMeeting(Meeting meeting)
        {
            await sut.CreateAsync(meeting);
            meeting.Description = "thisIsMyNewEditedDescription";

            await sut.UpdateAsync(meeting);

            var updatedApplication = await sut.GetAsync(meeting.Id);
            Assert.Equal("thisIsMyNewEditedDescription", updatedApplication!.Description!);
        }
    }
}

using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using AutoFixture;
using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data;

namespace SimplyRecruitAPITests.Repositories
{
    public class MeetingTimesRepositoryShould
    {
        private readonly Fixture fixture;
        private readonly DbContextOptions<SimplyRecruitDbContext> options;
        private readonly MeetingTimesRepository sut;

        public MeetingTimesRepositoryShould()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            options = new DbContextOptionsBuilder<SimplyRecruitDbContext>()
           .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
           .Options;
            var DbContext = new SimplyRecruitDbContext(options);
            sut = new MeetingTimesRepository(DbContext);
        }

        [Theory]
        [AutoData]

        public async Task AddMeetingTimesToDatabase(MeetingTimes meetingTime)
        {
            await sut.CreateAsync(meetingTime);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.MeetingTimes.Contains(meetingTime));
            }
        }


        [Theory]
        [AutoData]
        public async Task RemoveMeetingFromDatabase(MeetingTimes meetingTime)
        {
            await sut.CreateAsync(meetingTime);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                Assert.True(dbContext.MeetingTimes.Contains(meetingTime));
            }

            await sut.DeleteAsync(meetingTime);

            using (var dbContext = new SimplyRecruitDbContext(options))
            {
                var retrievedProject = await dbContext.MeetingTimes.FindAsync(meetingTime.Id);
                Assert.Null(retrievedProject);
            }
        }

        [Theory]
        [AutoData]
        public async Task GetMeetingById(MeetingTimes meetingTime)
        {
            await sut.CreateAsync(meetingTime);
            var retrievedTime = await sut.GetAsync(meetingTime.Id);

            Assert.NotNull(retrievedTime);
            Assert.Equal(meetingTime.Id, retrievedTime!.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetAllMeetingsMeetingTimes(IEnumerable<MeetingTimes> meetingTimes,
            Meeting meeting)
        {
            foreach (var time in meetingTimes)
            {
                time.Meeting = meeting;
                await sut.CreateAsync(time);
            }

            var retrievedMeetings = await sut.GetMeetingsManyAsync(meeting.Id);

            Assert.Equal(meetingTimes.Count(), retrievedMeetings.Count());
        }

        [Theory]
        [AutoData]
        public async Task UpdateMeetingTimes(MeetingTimes times)
        {
            await sut.CreateAsync(times);
            times.SelectedAttendees = "thisIsNewSelected";

            await sut.UpdateAsync(times);

            var updatedTime = await sut.GetAsync(times.Id);
            Assert.Equal("thisIsNewSelected", updatedTime!.SelectedAttendees!);
        }

        [Theory]
        [AutoData]
        public async Task UpdateManyMeetingTimes(List<MeetingTimes> times)
        {
            foreach(MeetingTimes time in times)
            {
                await sut.CreateAsync(time);
                time.SelectedAttendees = "thisIsNewSelected";
            }

            await sut.UpdateManyAsync(times.ToArray());

            foreach(MeetingTimes time in times)
            {
                var updatedTime = await sut.GetAsync(time.Id);
                Assert.Equal("thisIsNewSelected", updatedTime!.SelectedAttendees!);
            }
        }
    }
}

using SimplyRecruitAPI.Auth.Model;

namespace SimplyRecruitAPI.Data.Entities
{
    public class ApplicationTask : IUserOwnedResource
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Goal { get; set; }
        public bool AnswerSubmited { get; set; }
        public DateTime Deadline { get; set; }
        public string? FileName { get; set; }
        public byte[]? FileData { get; set; }
        public string? Url { get; set; }
        public Application Application { get; set; }
    }
}

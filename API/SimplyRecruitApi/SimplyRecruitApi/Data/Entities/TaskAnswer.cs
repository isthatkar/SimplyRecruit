using SimplyRecruitAPI.Auth.Model;

namespace SimplyRecruitAPI.Data.Entities
{
    public class TaskAnswer : IUserOwnedResource
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Comment { get; set; }
        public string? FileName { get; set; }
        public byte[]? FileData { get; set; }
        public string? Url { get; set; }
        public ApplicationTask Task { get; set; }
    }
}

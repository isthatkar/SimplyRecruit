namespace SimplyRecruitAPI.Data.Entities
{
    public class Resume
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public byte[] Data { get; set; }
        public Application Application { get; set; }
    }
}

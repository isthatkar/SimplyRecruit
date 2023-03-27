namespace SimplyRecruitAPI.Data.Dtos.Resumes
{
    public record ResumeDto(int Id, string FileName, byte[] Data);
    public record CreateResumeDto(string FileName);

}

using System;

namespace SimplyRecruitAPI.Data.Dtos.Tasks
{
    public record TaskDto(int Id, string Title, string Goal, bool AnswerSubmited, DateTime Deadline, string? FileName, string? Url, int ApplicationId);
    public record CreateTaskDto(string Title, string Goal, DateTime Deadline, string? FileName, string? Url);
}

﻿namespace SimplyRecruitAPI.Data.Dtos.Tasks
{
   public record TaskAnswerDto(int Id, string Commnent, string? FileName, string? Url, int TaskId);
    public record CreateTaskAnswerDto(string Commment, string? FileName, string? Url);
}

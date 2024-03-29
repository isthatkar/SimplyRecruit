﻿using SimplyRecruitAPI.Data.Enums;

namespace SimplyRecruitAPI.Data.Dtos.Applications
{
    public class ApplicationsDtos
    {
        public record ApplicationDto(int Id, string FullName, string PhoneNumber, string? ProfileUrl, string? CoverLetter, string ContactEmail, Stage Stage,double AverageRating, double AverageSkillRating, double AverageCommsRating, double AverageAttitudeRating, int PositionId, string UserId, string PositionName, bool isArchived);
        public record PositionApplicationDto(int Id, string FullName, string PhoneNumber, string? ProfileUrl, string? CoverLetter, string ContactEmail, Stage Stage, double AverageRating, double AverageSkillRating, double AverageCommsRating, double AverageAttitudeRating, string UserId, string PositionName, bool isArchived);

        public record CreateApplicationDto(string FullName, string PhoneNumber, string? ProfileUrl, string? CoverLetter, string ContactEmail);

        public record UpdateApplicationDto(string? FullName, string? PhoneNumber, string? ProfileUrl, string? CoverLetter, string? ContactEmail, Stage? Stage, bool? isArchived);
    }
}

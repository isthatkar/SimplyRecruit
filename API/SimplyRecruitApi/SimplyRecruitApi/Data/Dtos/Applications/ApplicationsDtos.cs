using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Enums;

namespace SimplyRecruitAPI.Data.Dtos.Applications
{
    public class ApplicationsDtos
    {
        public record ApplicationDto(int Id, string FullName, string PhoneNumber, string? ProfileUrl, string? CoverLetter, string ContactEmail, Stage Stage, int PositionId, string UserId);
        public record PositionApplicationDto(int Id, string FullName, string PhoneNumber, string? ProfileUrl, string? CoverLetter, string ContactEmail, Stage Stage, string UserId);

        public record CreateApplicationDto(string FullName, string PhoneNumber, string? ProfileUrl, string? CoverLetter, string ContactEmail);

        public record UpdateApplicationDto(string? FullName, string? PhoneNumber, string? ProfileUrl, string? CoverLetter, string? ContactEmail, Stage? Stage);
    }
}

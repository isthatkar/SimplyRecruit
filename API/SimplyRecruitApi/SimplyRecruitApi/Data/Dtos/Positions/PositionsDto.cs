using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Enums;

namespace SimplyRecruitAPI.Data.Dtos.Positions
{
    public record PositionDto(int Id, string Name, string? Description, DateTime DeadLine, bool IsOpen, Location Location, WorkTime WorkTime, Field Field, Project Project);
    public record ProjectPositionDto(int Id, string Name, string? Description, DateTime DeadLine, bool IsOpen, Location Location, WorkTime WorkTime, Field Field);

    public record CreatePositionDto(string Name, string Description, DateTime DeadLine, Location Location, WorkTime WorkTime, Field Field);

    public record UpdatePositionDto(string? Name, string? Description, DateTime? DeadLine, Location? Location, bool? IsOpen, WorkTime? WorkTime, Field? Field);
}

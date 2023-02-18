using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Enums;

namespace SimplyRecruitAPI.Data.Dtos.Projects
{
    public record ProjectDto(int Id, string Name, string? Description, NordProduct Product, string? ResponsiblePersonEmail);

    public record CreateProjectDto(string Name, string? Description, NordProduct Product, string? ResponsiblePersonEmail);

    public record UpdateProjectDto( string? Name, string? Description, NordProduct? Product, string? ResponsiblePersonEmail);
}

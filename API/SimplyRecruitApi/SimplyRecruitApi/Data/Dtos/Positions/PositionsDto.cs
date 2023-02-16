﻿using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Enums;

namespace SimplyRecruitAPI.Data.Dtos.Positions
{
   public record PositionDto(int Id, string Name, string? Description, DateTime DeadLine, Location Location, WorkTime WorkTime, Field Field, Project Project);

   public record CreatePositionDto(string Name, string Description, DateTime DeadLine, Location Location, WorkTime WorkTime, Field Field, int ProjectId);

   public record UpdatePositionDto(string? Name, string? Description, DateTime? DeadLine, Location? Location, WorkTime? WorkTime, Field? Field);
}

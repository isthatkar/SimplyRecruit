﻿using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Data.Dtos.Positions;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Controllers
{
    [Route("api/projects/{projectId}/positions")]
    // [Authorize] !!!!!! PO TESTAVIMO ATKOMENTUOTI //prideti roles prie editinimo ir pridejimo 
    [ApiController]
    public class ProjectPositionsController : ControllerBase
    {
        private readonly IProjectsRepository _projectsRepository;
        private readonly IPositionsRepository _positionsRepository;

        public ProjectPositionsController(IProjectsRepository projectsRepository, IPositionsRepository positionsRepository)
        {
            _projectsRepository = projectsRepository;
            _positionsRepository = positionsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectPositionDto>>> GetProjectsPositions(int projectId)
        {
            var project = await _projectsRepository.GetAsync(projectId);

            if (project == null)
            {
                return NotFound(); //404
            }

            var positions = await _positionsRepository.GetProjectsManyAsync(projectId);
            var positionsDto = positions.Select(p => new ProjectPositionDto(p.Id, p.Name, p.Description, p.Deadline, p.Location, p.WorkTime, p.Field));
            return Ok(positionsDto);
        }

        [HttpPost]
        public async Task<ActionResult<PositionDto>> Create(int projectId, CreatePositionDto createPositionDto)
        {
            var project = await _projectsRepository.GetAsync(projectId);

            if (project == null)
            {
                return NotFound("Project to which you want to add position was not found");
            }

            var position = new Position
            {
                Name = createPositionDto.Name,
                Description = createPositionDto.Description,
                Project = project,
                Deadline = createPositionDto.DeadLine,
                Location = createPositionDto.Location,
                Field = createPositionDto.Field,
                WorkTime = createPositionDto.WorkTime
            };

            await _positionsRepository.CreateAsync(position);

            //201
            return Created("", new PositionDto(position.Id, position.Name, position.Description, position.Deadline, position.Location, position.WorkTime, position.Field, position.Project));

        }
    }
}

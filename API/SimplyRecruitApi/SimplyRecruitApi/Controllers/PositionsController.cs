using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Data.Dtos.Positions;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Enums;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Controllers
{
    [Route("api/positions")]
    // [Authorize] !!!!!! PO TESTAVIMO ATKOMENTUOTI //prideti roles prie editinimo ir pridejimo 
    [ApiController]
    public class PositionsController : Controller
    {
        private readonly IPositionsRepository _positionsRepository;
        private readonly IProjectsRepository _projectsRepository;

        public PositionsController(IPositionsRepository positionsRepository, IProjectsRepository projectsRepository)
        {
            _positionsRepository = positionsRepository;
            _projectsRepository = projectsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<PositionDto>> GetMany()
        {
            var positions = await _positionsRepository.GetManyAsync();
            return positions.Select(p => new PositionDto(p.Id, p.Name, p.Description, p.Deadline, p.Location, p.WorkTime, p.Field, p.Project));
        }

        [HttpGet]
        [Route("{positionId}", Name = "GetPosition")]
        public async Task<ActionResult<PositionDto>> Get(int positionId)
        {
            var position = await _positionsRepository.GetAsync(positionId);

            if (position == null)
            {
                return NotFound(); //404
            }

            return new PositionDto(position.Id, position.Name, position.Description, position.Deadline, position.Location, position.WorkTime, position.Field, position.Project);
        }

        [HttpPost]
        public async Task<ActionResult<PositionDto>> Create(CreatePositionDto createPositionDto)
        {
            var project = await _projectsRepository.GetAsync(createPositionDto.ProjectId);

            if(project == null)
            {
                return NotFound("Project to which you want to add position was not found");
            }

            var position = new Position
            {
               Name = createPositionDto.Name,
               Description  = createPositionDto.Description,
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

        [HttpPut]
        [Route("{positionId}")]
        public async Task<ActionResult<Position>> Update(int positionId, UpdatePositionDto updatePositionDto)
        {
            var position = await _positionsRepository.GetAsync(positionId);

            if (position == null)
            {
                return NotFound(); //404
            }

            position.Name = updatePositionDto.Name is null ? position.Name : updatePositionDto.Name;
            position.Description = updatePositionDto.Description is null ? position.Description : updatePositionDto.Description;
            position.Deadline = updatePositionDto.DeadLine is null ? position.Deadline : (DateTime)updatePositionDto.DeadLine;
            position.Location = updatePositionDto.Location is null ? position.Location : (Location)updatePositionDto.Location;
            position.WorkTime = updatePositionDto.WorkTime is null ? position.WorkTime : (WorkTime)updatePositionDto.WorkTime;
            position.Field = updatePositionDto.Field is null ? position.Field : (Field)updatePositionDto.Field;

            await _positionsRepository.UpdateAsync(position);

            return Ok(new PositionDto(position.Id, position.Name, position.Description, position.Deadline, position.Location, position.WorkTime, position.Field, position.Project));
        }

        [HttpDelete]
        [Route("{positionId}")]
        public async Task<ActionResult> Remove(int positionId)
        {
            var position = await _positionsRepository.GetAsync(positionId);

            if (position == null)
            {
                return NotFound(); //404
            }

            await _positionsRepository.DeleteAsync(position);

            //204
            return NoContent();
        }
    }
}

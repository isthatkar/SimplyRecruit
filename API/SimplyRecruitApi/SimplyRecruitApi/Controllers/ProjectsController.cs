using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Dtos.Projects;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Enums;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsRepository _projectsRepository;

        public ProjectsController(IProjectsRepository projectsRepository)
        {
            _projectsRepository = projectsRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<ProjectDto>> GetMany()
        {
            var projects = await _projectsRepository.GetManyAsync();
            return projects.Select(p => new ProjectDto(p.Id, p.Name, p.Description, p.Product, p.ResponsiblePersonEmail));
        }

        [HttpGet]
        [Authorize]
        [Route("{projectId}", Name = "GetProject")]
        public async Task<ActionResult<ProjectDto>> Get(int projectId)
        {
            var project = await _projectsRepository.GetAsync(projectId);

            if (project == null)
            {
                return NotFound(); //404
            }

            return new ProjectDto(project.Id, project.Name, project.Description, project.Product, project.ResponsiblePersonEmail);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Employee)]
        public async Task<ActionResult<ProjectDto>> Create(CreateProjectDto createProjectDto)
        {
            var project = new Project
            {
                Name = createProjectDto.Name,
                Description = createProjectDto.Description,
                Product = createProjectDto.Product,
                ResponsiblePersonEmail = createProjectDto.ResponsiblePersonEmail
            };

            await _projectsRepository.CreateAsync(project);

            //201
            return Created("", new ProjectDto(project.Id, project.Name, project.Description, project.Product, project.ResponsiblePersonEmail));

        }

        [HttpPut]
        [Authorize(Roles = Roles.Employee)]
        [Route("{projectId}")]
        public async Task<ActionResult<Project>> Update(int projectId, UpdateProjectDto updateProjectDto)
        {
            var project = await _projectsRepository.GetAsync(projectId);

            if (project == null)
            {
                return NotFound(); //404
            }

            project.Name = updateProjectDto.Name is null ? project.Name : updateProjectDto.Name;
            project.Description = updateProjectDto.Description is null ? project.Description : updateProjectDto.Description;
            project.Product = updateProjectDto.Product is null ? project.Product : (NordProduct)updateProjectDto.Product;
            project.ResponsiblePersonEmail = updateProjectDto.ResponsiblePersonEmail is null ? project.ResponsiblePersonEmail : updateProjectDto.ResponsiblePersonEmail;

            await _projectsRepository.UpdateAsync(project);

            return Ok(new ProjectDto(project.Id, project.Name, project.Description, project.Product, project.ResponsiblePersonEmail));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.Employee)]
        [Route("{projectId}")]
        public async Task<ActionResult> Remove(int projectId)
        {
            var project = await _projectsRepository.GetAsync(projectId);

            if (project == null)
            {
                return NotFound(); //404
            }

            await _projectsRepository.DeleteAsync(project);

            //204
            return NoContent();
        }
    }
}

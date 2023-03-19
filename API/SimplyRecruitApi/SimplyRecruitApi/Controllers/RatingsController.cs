using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Dtos.Ratings;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;
using Application = SimplyRecruitAPI.Data.Entities.Application;

namespace SimplyRecruitAPI.Controllers
{
    [ApiController]
    [Route("api/applications/{applicationId}/ratings")]
    public class RatingsController : ControllerBase
    {
        private readonly IRatingsRepository _ratingsRepository;
        private readonly IApplicationsRepository _applicationsRepository;
        private readonly UserManager<SimplyUser> _userManager;


        public RatingsController(IRatingsRepository ratingsRepository, UserManager<SimplyUser> userManager, IApplicationsRepository applicationsRepository)
        {
            _ratingsRepository = ratingsRepository;
            _userManager = userManager;
            _applicationsRepository = applicationsRepository;
        }

        [HttpPost]
        [Authorize(Roles = Roles.Employee)]
        public async Task<ActionResult<RatingDto>> Create(int applicationId, AddRatingDto createRatingDto)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound("Project to which you want to add position was not found");
            }

            string userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await _userManager.FindByIdAsync(userId);

            var rating = new Rating
            {
                Comment = createRatingDto.Comment,
                SkillsRating = createRatingDto.SkillsRatings,
                CommunicationRating = createRatingDto.CommunicationRating,
                AttitudeRating = createRatingDto.AttitudeRating,
                UserId = user.Id,
                Application = application
            };

            await _ratingsRepository.CreateAsync(rating);

            await UpdateApplicationRatingAverages(application);
            //201
            return Created("", new RatingDto(
                rating.Id,
                rating.SkillsRating, 
                rating.CommunicationRating, 
                rating.AttitudeRating,
                rating.Comment,
                user.Email,
                user.Id,
                applicationId));
        }

        private async Task UpdateApplicationRatingAverages(Application application)
        {
            var allRatings = await _ratingsRepository.GetApplicationRatings(application.Id);

            double tempCommsRating = 0;
            double tempSkillsRating = 0;
            double tempAttitudeRating = 0;
            
            foreach(Rating rating in allRatings)
            {
                tempAttitudeRating += rating.AttitudeRating;
                tempCommsRating += rating.CommunicationRating;
                tempSkillsRating += rating.SkillsRating;
            }

            tempSkillsRating = tempSkillsRating / allRatings.Count();
            tempCommsRating = tempCommsRating / allRatings.Count();
            tempAttitudeRating = tempAttitudeRating / allRatings.Count();

            double averageRating = 0.5 * tempSkillsRating + 0.25 * tempAttitudeRating + 0.25 * tempCommsRating;

            application.AverageAttitudeRating = Math.Round(tempAttitudeRating, 1);
            application.AverageCommsRating = Math.Round(tempCommsRating, 1);
            application.AverageSkillRating = Math.Round(tempSkillsRating,1);
            application.AverageRating = Math.Round(averageRating, 1);

            await _applicationsRepository.UpdateAsync(application);
        }

        [HttpGet]
        [Authorize(Roles = Roles.Employee)]
        public async Task<IEnumerable<RatingDto>> GetApplicationsMany(int applicationId)
        {
            var ratings = await _ratingsRepository.GetApplicationRatings(applicationId);

            List<RatingDto> ratingDtos = new List<RatingDto>();

            foreach(Rating r in ratings)
            {
                var user = await _userManager.FindByIdAsync(r.UserId);
                ratingDtos.Add(new RatingDto(r.Id, r.SkillsRating, r.CommunicationRating, r.AttitudeRating, r.Comment, user.Email, r.UserId, applicationId));
            }

            return ratingDtos;
        }

        [HttpPut]
        [Authorize(Roles = Roles.Employee)] 
        [Route("{ratingId}")]
        public async Task<ActionResult<RatingDto>> Update(int applicationId, int ratingId, UpdateRatingDto updateRatingDto)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound();
            }

            var rating = await _ratingsRepository.GetAsync(ratingId);

            if (rating == null)
            {
                return NotFound(); //404
            }

            rating.Comment = updateRatingDto.Comment is null ? rating.Comment : updateRatingDto.Comment;
            rating.CommunicationRating = (int)(updateRatingDto.CommunicationRating is null ? rating.CommunicationRating : updateRatingDto.CommunicationRating);
            rating.AttitudeRating = (int)(updateRatingDto.AttitudeRating is null ? rating.AttitudeRating : updateRatingDto.AttitudeRating);
            rating.SkillsRating = (int)(updateRatingDto.SkillsRating is null ? rating.SkillsRating : updateRatingDto.SkillsRating);

            await _ratingsRepository.UpdateAsync(rating);
            var user = await _userManager.FindByIdAsync(rating.UserId);

            await UpdateApplicationRatingAverages(application);

            return Ok(new RatingDto(rating.Id, rating.SkillsRating, rating.CommunicationRating, rating.AttitudeRating, rating.Comment, user.Email, rating.UserId, rating.Application.Id));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.Employee)] 
        [Route("{ratingId}")]
        public async Task<ActionResult> Remove(int applicationId, int ratingId)
        {
            var application = await _applicationsRepository.GetAsync(applicationId);

            if (application == null)
            {
                return NotFound(); //404
            }

            var rating = await _ratingsRepository.GetAsync(ratingId);

            if (rating == null)
            {
                return NotFound(); //404
            }

            await _ratingsRepository.DeleteAsync(rating);

            await UpdateApplicationRatingAverages(application);

            //204
            return NoContent();
        }
    }
}

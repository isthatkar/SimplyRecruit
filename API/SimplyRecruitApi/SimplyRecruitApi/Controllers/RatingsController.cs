using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data.Dtos.Positions;
using SimplyRecruitAPI.Data.Dtos.Ratings;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.Security.Claims;

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
        [Authorize(Roles = Roles.Employee)] //cadidates cannot edit their applications
        [Route("{ratingId}")]
        public async Task<ActionResult<Application>> Update(int applicationId, int ratingId, UpdateRatingDto updateRatingDto)
        {
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


            return Ok(new RatingDto(rating.Id, rating.SkillsRating, rating.CommunicationRating, rating.AttitudeRating, rating.Comment, user.Email, rating.UserId, rating.Application.Id));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.Employee)] 
        [Route("{ratingId}")]
        public async Task<ActionResult> Remove(int applicationId, int ratingId)
        {
            var rating = await _ratingsRepository.GetAsync(ratingId);

            if (rating == null)
            {
                return NotFound(); //404
            }

            await _ratingsRepository.DeleteAsync(rating);

            //204
            return NoContent();
        }
    }
}

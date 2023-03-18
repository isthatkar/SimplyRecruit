using Microsoft.AspNetCore.Mvc;
using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Dtos.Ratings
{
    public record RatingDto(int Id, int SkillsRatings, int CommunicationRating, int AttitudeRating, string Comment, string UserEmail, string UserId, int ApplicationId);
    public record UpdateRatingDto(int? SkillsRating, int? CommunicationRating, int? AttitudeRating, string? Comment);
    public record AddRatingDto(int SkillsRatings, int CommunicationRating, int AttitudeRating, string Comment);


}

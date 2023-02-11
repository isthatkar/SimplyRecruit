namespace SimplyRecruitAPI.Auth
{
    public interface IJwtTokenService
    {
        string CreateAccessToken(string email, string userId, IEnumerable<string> userRoles);

        string CreateRefreshToken();
    }
}

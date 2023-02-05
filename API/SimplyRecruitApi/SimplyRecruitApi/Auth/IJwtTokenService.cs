namespace SimplyRecruitAPI.Auth
{
    public interface IJwtTokenService
    {
        string CreateAccessToken(string userName, string userId, IEnumerable<string> userRoles);

        string CreateRefreshToken();
    }
}

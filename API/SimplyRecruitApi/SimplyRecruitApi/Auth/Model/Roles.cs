namespace SimplyRecruitAPI.Auth.Model
{
    public static class Roles
    {
        public const string Admin = nameof(Admin);
        public const string Recruiter = nameof(Recruiter);
        public const string Employee = nameof(Employee);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, Recruiter, Employee };
    }
}

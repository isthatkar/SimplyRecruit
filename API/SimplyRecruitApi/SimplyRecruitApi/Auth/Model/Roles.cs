namespace SimplyRecruitAPI.Auth.Model
{
    public static class Roles
    {
        public const string Admin = nameof(Admin);
        public const string Employee = nameof(Employee);
        public const string Candidate = nameof(Candidate);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, Employee, Candidate  };
    }
}

using SimplyRecruitAPI.Data.Entities;

namespace SimplyRecruitAPI.Data.Repositories.Interfaces
{
    public interface IResumesRepository
    {
        Task CreateAsync(Resume resume);
        Task DeleteAsync(Resume resume);
        Task<Resume?> GetAsync(int resumeId);
        Task<Resume?> GetApplicationResumeAsync(int applicationId);
    }
}

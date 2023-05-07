using Microsoft.EntityFrameworkCore;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;

namespace SimplyRecruitAPI.Data.Repositories
{
    public class ResumesRepository : IResumesRepository
    {
        private readonly SimplyRecruitDbContext _context;

        public ResumesRepository(SimplyRecruitDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Resume resume)
        {
            _context.Resumes.Add(resume);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Resume resume)
        {
            _context.Resumes.Remove(resume);
            await _context.SaveChangesAsync();
        }

        public async Task<Resume?> GetApplicationResumeAsync(int applicationId) =>
            await _context.Resumes.FirstOrDefaultAsync(p => p.Application.Id == applicationId);

        public async Task<Resume?> GetAsync(int resumeId) =>
            await _context.Resumes.FirstOrDefaultAsync(p => p.Id == resumeId);
    }
}

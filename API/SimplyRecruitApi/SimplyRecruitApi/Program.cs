using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SimplyRecruitAPI.Auth;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data;
using SimplyRecruitAPI.Data.Repositories;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SimplyRecruitAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            // Add services to the container.

            builder.Services.AddControllers();


            builder.Services.AddDbContext<SimplyRecruitDbContext>(o => o.UseSqlServer(builder.Configuration["ConnectionStrings:DB_CONNECTION_STRING"]));
            builder.Services.AddTransient<IJwtTokenService, JwtTokenService>();
            builder.Services.AddScoped<AuthDbSeeder>();

            builder.Services.AddIdentity<SimplyUser, IdentityRole>()
                .AddEntityFrameworkStores<SimplyRecruitDbContext>()
                .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"];
                    options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"];
                    options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]));
                });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAuthorization(options =>
            {

                options.AddPolicy(PolicyNames.ResourceOwner, policy => policy.Requirements.Add(new ResourceOwnerRequirement()));
            });

            builder.Services.AddTransient<IProjectsRepository, ProjectsRepository>();
            builder.Services.AddTransient<IPositionsRepository, PositionsRepository>();
            builder.Services.AddTransient<IApplicationsRepository, ApplicationsRepository>();
            builder.Services.AddTransient<IResumesRepository, ResumesRepository>();
            builder.Services.AddTransient<IMeetingsRepository, MeetingsRepository>();
            builder.Services.AddTransient<IMeetingTimesRepository, MeetingTimesRepository>();
            builder.Services.AddTransient<IRatingsRepository, RatingsRepository>();
            builder.Services.AddSingleton<IAuthorizationHandler, ResourceOwnerHandler>();
            builder.Services.AddTransient<ITaskRepository, TaskRepository>();
            builder.Services.AddTransient<ITaskAnswerRepository, TaskAnswerRepository>();

            var app = builder.Build();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();

            app.MapControllers();

            app.UseAuthentication();
            app.UseAuthorization();


            var db = app.Services.CreateScope().ServiceProvider.GetRequiredService<SimplyRecruitDbContext>();
            db.Database.Migrate();

            var dbSeeder = app.Services.CreateScope().ServiceProvider.GetRequiredService<AuthDbSeeder>();
            await dbSeeder.SeedAsync();

            app.Run();
        }
    }
}


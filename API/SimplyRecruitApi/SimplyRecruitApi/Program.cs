using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using SimplyRecruitAPI.Auth;
using SimplyRecruitAPI.Auth.Model;
using SimplyRecruitAPI.Data;
using System.Text;

namespace SimplyRecruitAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

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

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();
            app.MapControllers();

            var dbSeeder = app.Services.CreateScope().ServiceProvider.GetRequiredService<AuthDbSeeder>();
            await dbSeeder.SeedAsync();
            app.Run();
        }
    }
}

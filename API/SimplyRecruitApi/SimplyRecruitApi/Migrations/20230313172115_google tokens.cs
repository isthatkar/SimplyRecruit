using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimplyRecruitAPI.Migrations
{
    /// <inheritdoc />
    public partial class googletokens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GoogleAccessToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GoogleRefreshToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoogleAccessToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GoogleRefreshToken",
                table: "AspNetUsers");
        }
    }
}

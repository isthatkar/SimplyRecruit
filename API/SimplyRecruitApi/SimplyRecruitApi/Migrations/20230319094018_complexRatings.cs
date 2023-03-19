using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimplyRecruitAPI.Migrations
{
    /// <inheritdoc />
    public partial class complexRatings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "AverageAttitudeRating",
                table: "Applications",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AverageCommsRating",
                table: "Applications",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AverageRating",
                table: "Applications",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AverageSkillRating",
                table: "Applications",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AverageAttitudeRating",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "AverageCommsRating",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "AverageSkillRating",
                table: "Applications");
        }
    }
}

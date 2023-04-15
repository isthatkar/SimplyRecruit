using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimplyRecruitAPI.Migrations
{
    /// <inheritdoc />
    public partial class meetingtype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFinal",
                table: "Meetings");

            migrationBuilder.AddColumn<int>(
                name: "MeetingType",
                table: "Meetings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MeetingType",
                table: "Meetings");

            migrationBuilder.AddColumn<bool>(
                name: "IsFinal",
                table: "Meetings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

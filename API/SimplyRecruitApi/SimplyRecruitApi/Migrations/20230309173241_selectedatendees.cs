using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimplyRecruitAPI.Migrations
{
    /// <inheritdoc />
    public partial class selectedatendees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SelectedAtendees",
                table: "Meetings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectedAtendees",
                table: "Meetings");
        }
    }
}

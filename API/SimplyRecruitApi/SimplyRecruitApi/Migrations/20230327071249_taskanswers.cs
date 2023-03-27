using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimplyRecruitAPI.Migrations
{
    /// <inheritdoc />
    public partial class taskanswers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TaskId",
                table: "TaskAnswers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TaskAnswers_TaskId",
                table: "TaskAnswers",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAnswers_Tasks_TaskId",
                table: "TaskAnswers",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskAnswers_Tasks_TaskId",
                table: "TaskAnswers");

            migrationBuilder.DropIndex(
                name: "IX_TaskAnswers_TaskId",
                table: "TaskAnswers");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "TaskAnswers");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiAquaGuardians.Migrations
{
    /// <inheritdoc />
    public partial class Robot : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Robots_RobotStations_StationId",
                table: "Robots");

            migrationBuilder.RenameColumn(
                name: "StationId",
                table: "Robots",
                newName: "RobotStationId");

            migrationBuilder.RenameIndex(
                name: "IX_Robots_StationId",
                table: "Robots",
                newName: "IX_Robots_RobotStationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Robots_RobotStations_RobotStationId",
                table: "Robots",
                column: "RobotStationId",
                principalTable: "RobotStations",
                principalColumn: "RobotStationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Robots_RobotStations_RobotStationId",
                table: "Robots");

            migrationBuilder.RenameColumn(
                name: "RobotStationId",
                table: "Robots",
                newName: "StationId");

            migrationBuilder.RenameIndex(
                name: "IX_Robots_RobotStationId",
                table: "Robots",
                newName: "IX_Robots_StationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Robots_RobotStations_StationId",
                table: "Robots",
                column: "StationId",
                principalTable: "RobotStations",
                principalColumn: "RobotStationId");
        }
    }
}

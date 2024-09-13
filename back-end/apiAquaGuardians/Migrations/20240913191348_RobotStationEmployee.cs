using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiAquaGuardians.Migrations
{
    /// <inheritdoc />
    public partial class RobotStationEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StationId",
                table: "Employees",
                newName: "RobotStationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_RobotStationId",
                table: "Employees",
                column: "RobotStationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_RobotStations_RobotStationId",
                table: "Employees",
                column: "RobotStationId",
                principalTable: "RobotStations",
                principalColumn: "RobotStationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_RobotStations_RobotStationId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_RobotStationId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "RobotStationId",
                table: "Employees",
                newName: "StationId");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiAquaGuardians.Migrations
{
    /// <inheritdoc />
    public partial class rbtErnt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "RobotRental");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "RobotRental",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

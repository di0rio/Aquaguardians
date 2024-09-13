using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiAquaGuardians.Migrations
{
    /// <inheritdoc />
    public partial class RobotRental2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "RobotRentals",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "RobotRentals");
        }
    }
}

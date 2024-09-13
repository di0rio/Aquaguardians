using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiAquaGuardians.Migrations
{
    /// <inheritdoc />
    public partial class Rental : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_RobotRentals_RobotRentalId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_RobotRentals_Companies_CompanyId",
                table: "RobotRentals");

            migrationBuilder.DropForeignKey(
                name: "FK_RobotRentals_Robots_RobotId",
                table: "RobotRentals");

            migrationBuilder.DropForeignKey(
                name: "FK_Robots_RobotRentals_RobotRentalId",
                table: "Robots");

            migrationBuilder.DropIndex(
                name: "IX_Robots_RobotRentalId",
                table: "Robots");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RobotRentals",
                table: "RobotRentals");

            migrationBuilder.DropIndex(
                name: "IX_RobotRentals_CompanyId",
                table: "RobotRentals");

            migrationBuilder.DropIndex(
                name: "IX_RobotRentals_RobotId",
                table: "RobotRentals");

            migrationBuilder.DropIndex(
                name: "IX_Companies_RobotRentalId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "RobotRentalId",
                table: "Robots");

            migrationBuilder.DropColumn(
                name: "RobotRentalId",
                table: "RobotRentals");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "RobotRentals");

            migrationBuilder.DropColumn(
                name: "RobotRentalId",
                table: "Companies");

            migrationBuilder.RenameColumn(
                name: "RobotId",
                table: "RobotRentals",
                newName: "RentalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RobotRentals",
                table: "RobotRentals",
                column: "RentalId");

            migrationBuilder.CreateTable(
                name: "RobotRental",
                columns: table => new
                {
                    RobotRentalId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RentalId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    RobotId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RobotRental", x => x.RobotRentalId);
                    table.ForeignKey(
                        name: "FK_RobotRental_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RobotRental_RobotRentals_RentalId",
                        column: x => x.RentalId,
                        principalTable: "RobotRentals",
                        principalColumn: "RentalId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RobotRental_Robots_RobotId",
                        column: x => x.RobotId,
                        principalTable: "Robots",
                        principalColumn: "RobotId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RobotRental_CompanyId",
                table: "RobotRental",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RobotRental_RentalId",
                table: "RobotRental",
                column: "RentalId");

            migrationBuilder.CreateIndex(
                name: "IX_RobotRental_RobotId",
                table: "RobotRental",
                column: "RobotId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RobotRental");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RobotRentals",
                table: "RobotRentals");

            migrationBuilder.RenameColumn(
                name: "RentalId",
                table: "RobotRentals",
                newName: "RobotId");

            migrationBuilder.AddColumn<Guid>(
                name: "RobotRentalId",
                table: "Robots",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RobotRentalId",
                table: "RobotRentals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId",
                table: "RobotRentals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "RobotRentalId",
                table: "Companies",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RobotRentals",
                table: "RobotRentals",
                column: "RobotRentalId");

            migrationBuilder.CreateIndex(
                name: "IX_Robots_RobotRentalId",
                table: "Robots",
                column: "RobotRentalId");

            migrationBuilder.CreateIndex(
                name: "IX_RobotRentals_CompanyId",
                table: "RobotRentals",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RobotRentals_RobotId",
                table: "RobotRentals",
                column: "RobotId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_RobotRentalId",
                table: "Companies",
                column: "RobotRentalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_RobotRentals_RobotRentalId",
                table: "Companies",
                column: "RobotRentalId",
                principalTable: "RobotRentals",
                principalColumn: "RobotRentalId");

            migrationBuilder.AddForeignKey(
                name: "FK_RobotRentals_Companies_CompanyId",
                table: "RobotRentals",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RobotRentals_Robots_RobotId",
                table: "RobotRentals",
                column: "RobotId",
                principalTable: "Robots",
                principalColumn: "RobotId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Robots_RobotRentals_RobotRentalId",
                table: "Robots",
                column: "RobotRentalId",
                principalTable: "RobotRentals",
                principalColumn: "RobotRentalId");
        }
    }
}

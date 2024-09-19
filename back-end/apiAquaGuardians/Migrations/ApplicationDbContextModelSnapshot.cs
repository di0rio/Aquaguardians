﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using apiAquaGuardians.Data;

#nullable disable

namespace apiAquaGuardians.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Company", b =>
                {
                    b.Property<Guid>("CompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("ContactName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("ContactPhone")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("CompanyId");

                    b.ToTable("Companies", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Employee", b =>
                {
                    b.Property<Guid>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("HireDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid?>("RobotStationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal?>("Salary")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("EmployeeId");

                    b.ToTable("Employees", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.GameStatistic", b =>
                {
                    b.Property<Guid>("GameStatisticId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Addpoints")
                        .HasColumnType("int");

                    b.Property<DateTime>("GameDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("PlayerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RobotId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("GameStatisticId");

                    b.HasIndex("PlayerId");

                    b.ToTable("GameStatistics", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Order", b =>
                {
                    b.Property<Guid>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("PlayerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("OrderId");

                    b.HasIndex("PlayerId");

                    b.ToTable("Orders", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.OrderItem", b =>
                {
                    b.Property<Guid>("OrderItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("OrderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("OrderItemId");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderItems", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.PaymentMethod", b =>
                {
                    b.Property<long>("PaymentMethodId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("PaymentMethodId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("PaymentMethodId");

                    b.ToTable("PaymentMethods", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Player", b =>
                {
                    b.Property<Guid>("PlayerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Nickname")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("points")
                        .HasColumnType("int");

                    b.HasKey("PlayerId");

                    b.HasIndex("UserId");

                    b.ToTable("Players", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Product", b =>
                {
                    b.Property<Guid>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<int>("StockQuantity")
                        .HasColumnType("int");

                    b.HasKey("ProductId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.ProductCategory", b =>
                {
                    b.Property<Guid>("ProductCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("ProductCategoryId");

                    b.ToTable("ProductCategories", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Rental", b =>
                {
                    b.Property<Guid>("RentalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<DateTime?>("RentalEndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("RentalStartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("RentalStatus")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("RentalId");

                    b.ToTable("RobotRentals", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Robot", b =>
                {
                    b.Property<Guid>("RobotId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsAvailableForRent")
                        .HasColumnType("bit");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid?>("RobotStationId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("RobotId");

                    b.HasIndex("RobotStationId");

                    b.ToTable("Robots", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.RobotRental", b =>
                {
                    b.Property<Guid>("RobotRentalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<Guid>("RentalId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RobotId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("RobotRentalId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("RentalId");

                    b.HasIndex("RobotId");

                    b.ToTable("RobotRental", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.RobotStation", b =>
                {
                    b.Property<Guid>("RobotStationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Capacity")
                        .HasColumnType("int");

                    b.Property<Guid?>("EmployeeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("RobotStationId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("RobotStations", (string)null);
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Transaction", b =>
                {
                    b.Property<Guid>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AltPoints")
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<Guid?>("OrderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<long>("PaymentMethodId")
                        .HasColumnType("bigint");

                    b.Property<Guid>("PlayerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("TransactionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("TransactionId");

                    b.HasIndex("OrderId");

                    b.HasIndex("PaymentMethodId");

                    b.HasIndex("PlayerId");

                    b.ToTable("Transactions", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("apiAquaGuardians.Models.GameStatistic", b =>
                {
                    b.HasOne("apiAquaGuardians.Models.Player", null)
                        .WithMany("GameStatistics")
                        .HasForeignKey("PlayerId");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Order", b =>
                {
                    b.HasOne("apiAquaGuardians.Models.Player", "Player")
                        .WithMany("Orders")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.OrderItem", b =>
                {
                    b.HasOne("apiAquaGuardians.Models.Order", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("apiAquaGuardians.Models.Product", "Product")
                        .WithMany("OrderItems")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Player", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Product", b =>
                {
                    b.HasOne("apiAquaGuardians.Models.ProductCategory", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Robot", b =>
                {
                    b.HasOne("apiAquaGuardians.Models.RobotStation", "Station")
                        .WithMany()
                        .HasForeignKey("RobotStationId");

                    b.Navigation("Station");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.RobotRental", b =>
                {
                    b.HasOne("apiAquaGuardians.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("apiAquaGuardians.Models.Rental", "Rental")
                        .WithMany()
                        .HasForeignKey("RentalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("apiAquaGuardians.Models.Robot", "Robot")
                        .WithMany()
                        .HasForeignKey("RobotId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Rental");

                    b.Navigation("Robot");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.RobotStation", b =>
                {
                    b.HasOne("apiAquaGuardians.Models.Employee", null)
                        .WithMany("RobotStations")
                        .HasForeignKey("EmployeeId");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Transaction", b =>
                {
                    b.HasOne("apiAquaGuardians.Models.Order", "Order")
                        .WithMany("Transactions")
                        .HasForeignKey("OrderId");

                    b.HasOne("apiAquaGuardians.Models.PaymentMethod", "PaymentMethod")
                        .WithMany("Transactions")
                        .HasForeignKey("PaymentMethodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("apiAquaGuardians.Models.Player", "Player")
                        .WithMany("Transactions")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("PaymentMethod");

                    b.Navigation("Player");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Employee", b =>
                {
                    b.Navigation("RobotStations");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Order", b =>
                {
                    b.Navigation("OrderItems");

                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.PaymentMethod", b =>
                {
                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Player", b =>
                {
                    b.Navigation("GameStatistics");

                    b.Navigation("Orders");

                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.Product", b =>
                {
                    b.Navigation("OrderItems");
                });

            modelBuilder.Entity("apiAquaGuardians.Models.ProductCategory", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}

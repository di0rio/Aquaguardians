using apiAquaGuardians.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace apiAquaGuardians.Data
{
	public class ApplicationDbContext : IdentityDbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<RobotStation> RobotStations { get; set; }
		public DbSet<Rental> RobotRentals { get; set; }
		public DbSet<Robot> Robots { get; set; }
		public DbSet<Reward> Rewards { get; set; }
		public DbSet<ProductCategory> ProductCategories { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<PaymentMethod> PaymentMethods { get; set; }
		public DbSet<OrderItem> OrderItens { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<GameStatistic> GameStatistics { get; set; }
		public DbSet<Employee> Employees { get; set; }
		public DbSet<Company> Companies { get; set; }
		public DbSet<Player> Players { get; set; }



		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<Transaction>().ToTable("Transactions");
			modelBuilder.Entity<RobotStation>().ToTable("RobotStations");
			modelBuilder.Entity<Rental>().ToTable("RobotRentals");
			modelBuilder.Entity<Robot>().ToTable("Robots");
			modelBuilder.Entity<Reward>().ToTable("Rewards");
			modelBuilder.Entity<ProductCategory>().ToTable("ProductCategories");
			modelBuilder.Entity<Product>().ToTable("Products");
			modelBuilder.Entity<PaymentMethod>().ToTable("PaymentMethods");
			modelBuilder.Entity<OrderItem>().ToTable("OrderItems");
			modelBuilder.Entity<Order>().ToTable("Orders");
			modelBuilder.Entity<GameStatistic>().ToTable("GameStatistics");
			modelBuilder.Entity<Employee>().ToTable("Employees");
			modelBuilder.Entity<Company>().ToTable("Companies");
			modelBuilder.Entity<Player>().ToTable("Players");
		}
	    public DbSet<apiAquaGuardians.Models.RobotRental> RobotRental { get; set; } = default!;


	}
}

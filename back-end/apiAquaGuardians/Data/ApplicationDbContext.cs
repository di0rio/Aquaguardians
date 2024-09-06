using apiAquaGuardians.Models;
using Microsoft.EntityFrameworkCore;

namespace apiAquaGuardians.Data
{
	public class ApplicationDbContext : DbContext 
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

		DbSet<User> Users { get; set; }
		DbSet<UserData> UserDatas { get; set; }
		DbSet<Transaction> Transactions { get; set; }
		DbSet<RobotStation> RobotStations { get; set; }
		DbSet<RobotRental> RobotRentals { get; set; }
		DbSet<Robot> Robots { get; set; }
		DbSet<Reward> Rewards { get; set; }
		DbSet<ProductCategory> ProductCategorys { get; set; }
		DbSet<Product> Products { get; set; }
		DbSet<PaymentMethod> PaymentMethods { get; set; }
		DbSet<OrderItem> OrderItens { get; set; }
		DbSet<Order> Orders { get; set; }
		DbSet<GameStatistic> GameStatistics { get; set; }
		DbSet<Employee> Employees { get; set; }
		DbSet<Company> Companys { get; set; }




		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<User>().ToTable("Users");
			modelBuilder.Entity<UserData>().ToTable("UserDatas");
			modelBuilder.Entity<Transaction>().ToTable("Transactions");
			modelBuilder.Entity<RobotStation>().ToTable("RobotStations");
			modelBuilder.Entity<RobotRental>().ToTable("RobotRentals");
			modelBuilder.Entity<Robot>().ToTable("Robots");
			modelBuilder.Entity<Reward>().ToTable("Rewards");
			modelBuilder.Entity<ProductCategory>().ToTable("ProductCategorys");
			modelBuilder.Entity<Product>().ToTable("Products");
			modelBuilder.Entity<PaymentMethod>().ToTable("PaymentMethods");
			modelBuilder.Entity<OrderItem>().ToTable("OrderItems");
			modelBuilder.Entity<Order>().ToTable("Orders");
			modelBuilder.Entity<GameStatistic>().ToTable("GameStatistics");
			modelBuilder.Entity<Employee>().ToTable("Employees");
			modelBuilder.Entity<Company>().ToTable("Companys");
		}
	}
}

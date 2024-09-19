using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Product
	{
		[Key]
		public Guid ProductId { get; set; }

		public Guid CategoryId { get; set; }
		public ProductCategory Category { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string Description { get; set; }

		[Column(TypeName = "decimal(10, 2)")]
		public decimal? Price { get; set; }

		public int StockQuantity { get; set; } = 0;

		public ICollection<OrderItem>? OrderItems { get; set; }

		public long ProductCategoryId { get; set; }
		public ProductCategory ProductCategory { get; set; }
	}
}

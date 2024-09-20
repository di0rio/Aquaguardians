using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class OrderItem
	{
		[Key]
		public Guid OrderItemId { get; set; }

		public Guid OrderId { get; set; }
		public Order? Order { get; set; }

		public Guid ProductId { get; set; }
		public Product? Product { get; set; }

		public int Quantity { get; set; }

		[Column(TypeName = "decimal(10, 2)")]
		public decimal? Price { get; set; }
	}
}

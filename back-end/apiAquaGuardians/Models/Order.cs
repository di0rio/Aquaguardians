using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Order
	{
		[Key]
		public Guid OrderId { get; set; }

		public Guid UserId { get; set; }
		public User User { get; set; }

		public DateTime OrderDate { get; set; } = DateTime.Now;

		[Column(TypeName = "decimal(10, 2)")]
		public decimal TotalAmount { get; set; }

		public ICollection<OrderItem> OrderItems { get; set; }
		public ICollection<Transaction> Transactions { get; set; }
	}
}

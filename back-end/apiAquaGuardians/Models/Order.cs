using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace apiAquaGuardians.Models
{
	public class Order
	{
		[Key]
		public Guid OrderId { get; set; }
		public DateTime OrderDate { get; set; } = DateTime.Now;

		[Column(TypeName = "decimal(10, 2)")]
		public decimal? TotalAmount { get; set; }

		public Guid PlayerId { get; set; }
		public Player? Player { get; set; }
		public Guid? TransactionId{ get; set; }
		public Transaction? Transaction { get; set; }
		public ICollection<OrderItem>? OrderItems { get; set; }
	}
}

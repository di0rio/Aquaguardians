using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Transaction
	{
		[Key]
		public Guid TransactionId { get; set; }

		public Guid? OrderId { get; set; }
		public Order Order { get; set; }

		public Guid UserId { get; set; }
		public User User { get; set; }

		public Guid PaymentMethodId { get; set; }
		public PaymentMethod PaymentMethod { get; set; }

		[Column(TypeName = "decimal(10, 2)")]
		public decimal Amount { get; set; }

		public DateTime TransactionDate { get; set; } = DateTime.Now;

		[Required]
		[MaxLength(50)]
		public string Type { get; set; }

		public Guid? RewardId { get; set; }
		public Reward Reward { get; set; }
	}
}

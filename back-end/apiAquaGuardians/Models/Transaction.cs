using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace apiAquaGuardians.Models
{
	public class Transaction
	{
		[Key]
		public Guid TransactionId { get; set; }
		public DateTime TransactionDate { get; set; } = DateTime.Now;

        [Column(TypeName = "decimal(10, 2)")]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(50)]
        public string Type { get; set; }

        public Guid? OrderId { get; set; }
		public Order Order { get; set; }
		public Guid PlayerId { get; set; }
		public Player? Player { get; set; }

		public Guid PaymentMethodId { get; set; }
		public PaymentMethod PaymentMethod { get; set; }

	}
}

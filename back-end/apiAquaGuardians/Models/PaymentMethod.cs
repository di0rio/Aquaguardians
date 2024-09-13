using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class PaymentMethod
	{
		[Key]
		public long PaymentMethodId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string Description { get; set; }

		public ICollection<Transaction>? Transactions { get; set; }
	}
}

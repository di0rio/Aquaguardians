using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiAquaGuardians.Models
{
	public class Rental
	{
		[Key]
		public Guid RentalId { get; set; }

		[Column(TypeName = "decimal(10, 2)")]
		public decimal Price { get; set; }
		public DateTime RentalStartDate { get; set; }

		public DateTime? RentalEndDate { get; set; }

		[Required]
		[MaxLength(50)]
		public string RentalStatus { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;


	}
}

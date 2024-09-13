using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class RobotRental
	{
		[Key]
		public Guid RobotRentalId { get; set; }

		public Guid CompanyId { get; set; }
		public Company? Company { get; set; }

		public Guid RobotId { get; set; }
		public Robot? Robot { get; set; }

		public DateTime RentalStartDate { get; set; }

		public DateTime? RentalEndDate { get; set; }

		[Required]
		[MaxLength(50)]
		public string RentalStatus { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public ICollection<Robot>? Robots { get; set; }
		public ICollection<Company>? Companies { get; set; }
	}
}

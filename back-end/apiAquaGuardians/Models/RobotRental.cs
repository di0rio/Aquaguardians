using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class RobotRental
	{
		[Key]
		public Guid RobotRentalId { get; set; }

		[Column(TypeName = "decimal(10, 2)")]
		public decimal Price { get; set; }

		public Guid RentalId { get; set; }
		public Rental? Rental { get; set; }
		public Guid RobotId { get; set; }
		public Robot? Robot { get; set; }
		public Guid CompanyId { get; set; }
		public Company? Company { get; set; }
	}
}

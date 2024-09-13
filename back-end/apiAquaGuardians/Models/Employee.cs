using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Employee
	{
		[Key]
		public Guid EmployeeId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string Department { get; set; }
		[Required]
		[MaxLength(255)]
		public string Position { get; set; }

		[MaxLength(255)]
		public string Email { get; set; }

		[MaxLength(50)]
		public string PhoneNumber { get; set; }

		[MaxLength(255)]
		public string Address { get; set; }

		public DateTime? DateOfBirth { get; set; }

		[Column(TypeName = "decimal(10, 2)")]
		public decimal? Salary { get; set; }
		public DateTime HireDate { get; set; } = DateTime.Now;

		public Guid? RobotStationId { get; set; }
		public RobotStation? RobotStation { get; set; }
	}
}

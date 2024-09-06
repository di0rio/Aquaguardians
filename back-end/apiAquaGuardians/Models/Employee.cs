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

		[MaxLength(255)]
		public string Department { get; set; }

		[MaxLength(255)]
		public string EmergencyContactName { get; set; }

		[MaxLength(50)]
		public string EmergencyContactPhone { get; set; }

		[MaxLength(50)]
		public string EmploymentStatus { get; set; }

		[MaxLength(255)]
		public string JobTitle { get; set; }

		public DateTime HireDate { get; set; } = DateTime.Now;

		public long? StationId { get; set; }
		public RobotStation Station { get; set; }
	}
}

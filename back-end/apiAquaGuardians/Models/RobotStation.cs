using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class RobotStation
	{
		[Key]
		public Guid RobotStationId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Location { get; set; }

		[Required]
		[MaxLength(255)]
		public string Status { get; set; }

		public DateTime? LastMaintenance { get; set; }

		public int? Capacity { get; set; }

		public Guid? ManagerId { get; set; }
		public Employee Manager { get; set; }

		[MaxLength(255)]
		public string OperatingHours { get; set; }

		[MaxLength(500)]
		public string SafetyProtocols { get; set; }

		[MaxLength(500)]
		public string MaintenanceSchedule { get; set; }

		public ICollection<Robot>? Robots { get; set; }
	}


}

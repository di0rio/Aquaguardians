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

		public string Name { get; set; }

		public int? Capacity { get; set; }

	}


}

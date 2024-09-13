using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Robot
	{
		[Key]
		public Guid RobotId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		[Required]
		[MaxLength(255)]
		public string Model { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;
		public bool IsAvailableForRent { get; set; } = true;

		public Guid? RobotStationId { get; set; }
		public RobotStation? Station { get; set; }


		//public ICollection<GameStatistic>? GameStatistics { get; set; }

	}


}

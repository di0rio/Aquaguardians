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
		public string Type { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public Guid? StationId { get; set; }
		public RobotStation Station { get; set; }

		public bool IsAvailableForRent { get; set; } = true;

		public ICollection<GameStatistic> GameStatistics { get; set; }
		public ICollection<RobotRental> RobotRentals { get; set; }
	}


}

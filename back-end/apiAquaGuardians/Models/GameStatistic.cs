using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class GameStatistic
	{
		[Key]
		public Guid GameStatisticId { get; set; }

		public Guid UserId { get; set; }
		public User User { get; set; }

		public Guid RobotId { get; set; }
		public Robot Robot { get; set; }

		public DateTime GameDate { get; set; } = DateTime.Now;
	}
}

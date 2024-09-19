using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class GameStatistic
	{
		[Key]
		public Guid GameStatisticId { get; set; }
		public int Addpoints { get; set; }
		public Guid RobotId { get; set; }
		public DateTime GameDate { get; set; } = DateTime.Now;
		public Guid? PlayerId { get; set; }
	}
}

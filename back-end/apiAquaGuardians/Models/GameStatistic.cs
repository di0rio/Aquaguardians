using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class GameStatistic
	{
		[Key]
		public Guid GameStatisticId { get; set; }
		public Guid RobotId { get; set; }
		public Robot Robot { get; set; }
		public DateTime GameDate { get; set; } = DateTime.Now;

		public Guid? PlayerId { get; set; }
		public Player? Player { get; set; }
	}
}

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Reward
	{
		[Key]
		public Guid RewardId { get; set; }

		public Guid PlayerId { get; set; }
		public Player? Player { get; set; }

		public int Points { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;
	}
}

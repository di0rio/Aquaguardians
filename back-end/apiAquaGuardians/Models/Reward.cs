using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Reward
	{
		[Key]
		public Guid RewardId { get; set; }

		public Guid UserId { get; set; }
		public User User { get; set; }

		public int Points { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;
	}
}

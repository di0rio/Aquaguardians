using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class User
	{
		[Key]
		public Guid UserId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Username { get; set; }

		[Required]
		[MaxLength(255)]
		public string Email { get; set; }

		[Required]
		[MaxLength(255)]
		public string Password { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public ICollection<GameStatistic> GameStatistics { get; set; }
		public ICollection<Order> Orders { get; set; }
		public ICollection<Transaction> Transactions { get; set; }
		public ICollection<Reward> Rewards { get; set; }
		public UserData UserData { get; set; }
	}
}

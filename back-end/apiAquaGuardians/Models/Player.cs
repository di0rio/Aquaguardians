using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Player
	{

		public Guid PlayerId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Nickname { get; set; }

		[MaxLength(255)]
		[DataType(DataType.EmailAddress, ErrorMessage ="Formato de E-mail Invalido")]
		public string? Email { get; set; }
		public int points { get; set; }

		[Required]
		[MaxLength(255)]
		public string Address { get; set; }

		public DateTime CreatedAt { get; set; }

		public string? UserId { get; set; }
		public IdentityUser? User { get; set; }	

		public IEnumerable<GameStatistic>? GameStatistics { get; set; }
		public IEnumerable<Order>? Orders { get; set; }
		public IEnumerable<Transaction>? Transactions { get; set; }
	}
}

using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class UserData
	{
		[Key]
		public Guid UserDataId { get; set; }

		public Guid UserId { get; set; }
		public User? User { get; set; }

		[MaxLength(255)]
		public string Address { get; set; }

		[MaxLength(50)]
		public string PhoneNumber { get; set; }
	}
}

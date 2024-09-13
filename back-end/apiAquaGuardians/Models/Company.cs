using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class Company
	{
		[Key]
		public Guid CompanyId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string ContactName { get; set; }

		[Required]
		[MaxLength(255)]
		public string ContactEmail { get; set; }

		[Required]
		[MaxLength(50)]
		public string ContactPhone { get; set; }

		[MaxLength(255)]
		public string Address { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;


	}
}

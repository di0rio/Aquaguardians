using System.ComponentModel.DataAnnotations;

namespace apiAquaGuardians.Models
{
	public class ProductCategory
	{
		[Key]
		public Guid ProductCategoryId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string Description { get; set; }

		public ICollection<Product> Products { get; set; }
	}
}

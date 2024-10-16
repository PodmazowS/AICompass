using System.ComponentModel.DataAnnotations;

namespace AICompassAPI.Models
{
	public class CategoryUpdateDto
	{
		[Required]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
	}
}
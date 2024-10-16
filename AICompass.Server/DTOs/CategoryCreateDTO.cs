using System.ComponentModel.DataAnnotations;

namespace AICompassAPI.Models
{
	public class CategoryCreateDto
	{
		[Required]
		public string Name { get; set; }
	}
}
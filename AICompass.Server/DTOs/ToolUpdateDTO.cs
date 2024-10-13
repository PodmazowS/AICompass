using System.ComponentModel.DataAnnotations;

namespace AICompassAPI.Models
{
	public class ToolUpdateDto
	{
		[Required]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		public string ImageUrl { get; set; } // URL to the image
		[Required]
		public int CategoryId { get; set; }
	}
}
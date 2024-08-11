using System.ComponentModel.DataAnnotations;

namespace AICompass.Server.Models
{
	public class Tool
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		public string ImageUrl { get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }
		public ICollection<ToolTag> ToolTags { get; set; } = new List<ToolTag>();
		public ICollection<Review> Reviews { get; set; } = new List<Review>(); 

	}
}

using System.ComponentModel.DataAnnotations;

namespace AICompass.Server.Models
{
	public class Tag
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public ICollection<ToolTag> ToolTags { get; set; }
	}
}

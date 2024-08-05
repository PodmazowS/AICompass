using System.ComponentModel.DataAnnotations;

namespace AICompass.Server.Models
{
	public class Category
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }

		public ICollection<Tool> Tools { get; set; }
	}
}

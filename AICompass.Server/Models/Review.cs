using System.ComponentModel.DataAnnotations;

namespace AICompass.Server.Models
{
	public class Review
	{
		public int Id { get; set; }

		public int UserId { get; set; }
		public User User { get; set; }

		public int ToolId { get; set; }
		public Tool Tool { get; set; }

		[Range(1, 5)]
		public int Rating { get; set; }
		public string Comment { get; set; }
	}
}

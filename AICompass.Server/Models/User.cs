using System.ComponentModel.DataAnnotations;

namespace AICompass.Server.Models
{
	public class User
	{
		public int Id { get; set; }
		[Required]
		public string Username { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		public string Password { get; set; }
		public ICollection<Review> Reviews { get; set; }

	}
}

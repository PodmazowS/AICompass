using System.ComponentModel.DataAnnotations;

namespace AICompassAPI.Models
{
	public class UserProfileDto
	{
		public int Id { get; set; }
		[Required]
		public string Username { get; set; }
		[Required]
		public string Email { get; set; }
	}
}
using System.ComponentModel.DataAnnotations;

namespace AICompassAPI.Models
{
	public class UserRegistrationDto
	{
		[Required]
		public string Username { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		public string Password { get; set; }
	}
}
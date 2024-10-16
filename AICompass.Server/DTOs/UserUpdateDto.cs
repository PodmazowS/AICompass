using System.ComponentModel.DataAnnotations;

namespace AICompass.Server.DTOs
{
	public class UserUpdateDto
	{
		public int Id { get; set; }
		[Required]
		public string Username { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		public string Role { get; set; }
	}
}

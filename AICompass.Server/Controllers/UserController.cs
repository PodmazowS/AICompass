using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AICompass.Server.Data;
using AICompassAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AICompass.Server.Data;
using AICompass.Server.DTOs;
using AICompass.Server.Models;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

namespace AICompassAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly ApplicationDbContext _context;

		public UserController(IConfiguration configuration, ApplicationDbContext context)
		{
			_configuration = configuration;
			_context = context;
		}

		// POST: api/User/register
		[HttpPost("register")]
		public async Task<IActionResult> Register(UserRegistrationDto userRegistrationDto)
		{
			if (await _context.Users.AnyAsync(u => u.Username == userRegistrationDto.Username))
			{
				return BadRequest("Username already exists.");
			}

			var user = new User
			{
				Username = userRegistrationDto.Username,
				Email = userRegistrationDto.Email,
				Password = userRegistrationDto.Password, // In a real application, hash the password
				Role = "User"
			};

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			return Ok(new { Message = "User registered successfully" });
		}

		// POST: api/User/login
		[HttpPost("login")]
		public async Task<IActionResult> Login(UserLoginModel login)
		{
			var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username && u.Password == login.Password);
			if (user == null)
			{
				return Unauthorized();
			}

			var token = GenerateJwtToken(user.Username, user.Role);
			return Ok(new { token });
		}

		// GET: api/User/profile
		[HttpGet("profile")]
		public async Task<ActionResult<UserProfileDto>> GetProfile()
		{
			var username = User.Identity.Name;

			var user = await _context.Users
				.Where(u => u.Username == username)
				.Select(u => new UserProfileDto
				{
					Id = u.Id,
					Username = u.Username,
					Email = u.Email
				})
				.FirstOrDefaultAsync();

			if (user == null)
			{
				return NotFound();
			}

			return user;
		}

		// PUT: api/User/profile
		[HttpPut("profile")]
		public async Task<IActionResult> UpdateProfile(UserProfileDto userProfileDto)
		{
			var username = User.Identity.Name;

			var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
			if (user == null)
			{
				return NotFound();
			}

			user.Username = userProfileDto.Username;
			user.Email = userProfileDto.Email;

			_context.Entry(user).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!UserExists(user.Id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// GET: api/User
		[HttpGet]
		/*[Authorize(Roles = "Admin")]*/ // Protect this endpoint
		public async Task<ActionResult<IEnumerable<User>>> GetUsers()
		{
			return await _context.Users.ToListAsync();
		}

		// GET: api/User/{id}
		[HttpGet("{id}")]
		/*[Authorize(Roles = "Admin")]*/ // Protect this endpoint
		public async Task<ActionResult<User>> GetUser(int id)
		{
			var user = await _context.Users.FindAsync(id);

			if (user == null)
			{
				return NotFound();
			}

			return user;
		}

		// PUT: api/User/{id}
		[HttpPut("{id}")]
		/*[Authorize(Roles = "Admin")]*/ // Protect this endpoint
		public async Task<IActionResult> UpdateUser(int id, UserUpdateDto userUpdateDto)
		{
			if (id != userUpdateDto.Id)
			{
				return BadRequest();
			}

			var user = await _context.Users.FindAsync(id);
			if (user == null)
			{
				return NotFound();
			}

			user.Username = userUpdateDto.Username;
			user.Email = userUpdateDto.Email;
			user.Role = userUpdateDto.Role;

			_context.Entry(user).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!UserExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// DELETE: api/User/{id}
		[HttpDelete("{id}")]
		/*[Authorize(Roles = "Admin")]*/ // Protect this endpoint
		public async Task<IActionResult> DeleteUser(int id)
		{
			var user = await _context.Users.FindAsync(id);
			if (user == null)
			{
				return NotFound();
			}

			_context.Users.Remove(user);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private string GenerateJwtToken(string username, string role)
		{
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, username),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(ClaimTypes.Role, role)
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				audience: _configuration["Jwt:Audience"],
				claims: claims,
				expires: DateTime.Now.AddMinutes(30),
				signingCredentials: creds);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		private bool UserExists(int id)
		{
			return _context.Users.Any(e => e.Id == id);
		}
	}

	public class UserLoginModel
	{
		public string Username { get; set; }
		public string Password { get; set; }
	}

}
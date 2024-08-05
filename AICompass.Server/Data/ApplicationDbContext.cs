using AICompass.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AICompass.Server.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{

		}

		public DbSet<Tool> Tool { get; set; }
	}
	
}

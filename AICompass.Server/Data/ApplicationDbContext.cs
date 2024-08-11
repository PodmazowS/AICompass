using AICompass.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AICompass.Server.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{

		}

		public DbSet<User> Users { get; set; }
		public DbSet<Tool> Tools { get; set; }
		public DbSet<Review> Reviews { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Tag> Tags { get; set; }
		public DbSet<ToolTag> ToolTags { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<ToolTag>()
				.HasKey(tt => new { tt.ToolId, tt.TagId });

			modelBuilder.Entity<ToolTag>()
				.HasOne(tt => tt.Tool)
				.WithMany(t => t.ToolTags)
				.HasForeignKey(tt => tt.ToolId);

			modelBuilder.Entity<ToolTag>()
				.HasOne(tt => tt.Tag)
				.WithMany(t => t.ToolTags)
				.HasForeignKey(tt => tt.TagId);
		}

	}
	
}

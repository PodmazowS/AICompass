using AICompass.Server.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS services
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigins",
		builder =>
		{
			builder.WithOrigins("https://localhost:5173")
				   .AllowAnyMethod()
				   .AllowAnyHeader();
		});
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigins"); // Apply the CORS policy

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
using AICompass.Server.Data;
using AICompass.Server.Models;
using AICompassAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AICompassAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ToolController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public ToolController(ApplicationDbContext context)
		{
			_context = context;
		}

		
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Tool>>> GetTools()
		{
			return await _context.Tools.ToListAsync();
		}

		
		[HttpGet("{id}")]
		public async Task<ActionResult<Tool>> GetTool(int id)
		{
			var tool = await _context.Tools.FindAsync(id);

			if (tool == null)
			{
				return NotFound();
			}

			return tool;
		}

		
		[HttpPost]
		public async Task<ActionResult<Tool>> PostTool(ToolCreateDto toolCreateDto)
		{
			var tool = new Tool
			{
				Name = toolCreateDto.Name,
				Description = toolCreateDto.Description,
				ImageUrl = toolCreateDto.ImageUrl,
				CategoryId = toolCreateDto.CategoryId
			};

			_context.Tools.Add(tool);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetTool), new { id = tool.Id }, tool);
		}

		
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTool(int id)
		{
			var tool = await _context.Tools.FindAsync(id);
			if (tool == null)
			{
				return NotFound();
			}

			_context.Tools.Remove(tool);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}

namespace AICompass.Server.Models
{
	public class ToolTag
	{
		public int ToolId { get; set; }
		public Tool Tool { get; set; }
		public int TagId { get; set; }
		public Tag Tag { get; set; }
	}
}

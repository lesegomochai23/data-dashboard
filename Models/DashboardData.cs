namespace DataDashboard.Models;

public class DashboardData
{
    public int TotalRevenue { get; set; }
    public int TotalUsers { get; set; }
    public int TotalOrders { get; set; }
    public int ConversionRate { get; set; }
    
    // For the Line Chart (e.g., Revenue per month)
    public List<int> MonthlyRevenue { get; set; } = new();
    
    // For the Doughnut Chart (e.g., Traffic sources)
    public List<int> TrafficSources { get; set; } = new();
}
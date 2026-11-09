using Microsoft.AspNetCore.Mvc;
using DataDashboard.Models;

namespace DataDashboard.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    [HttpGet]
    public ActionResult<DashboardData> GetDashboardData()
    {
        var random = new Random();
        
        var data = new DashboardData
        {
            TotalRevenue = 45890,
            TotalUsers = 12450,
            TotalOrders = 854,
            ConversionRate = 3, 
            
            MonthlyRevenue = Enumerable.Range(1, 12).Select(_ => random.Next(2000, 8000)).ToList(),
            TrafficSources = new List<int> { 4500, 3000, 2500, 2450 }
        };

        return Ok(data);
    }
}
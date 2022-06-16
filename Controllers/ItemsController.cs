using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ZofyaMVC.Models;

namespace ZofyaMVC.Controllers;

public class ItemsController : Controller
{
    private readonly ILogger<ItemsController> _logger;

    public ItemsController(ILogger<ItemsController> logger)
    {
        _logger = logger;
    }
    
    [Route("Items/WomensClothing/Blouses")]
    public IActionResult WomensClothing()
    {
        return View();
    }
    
    [Route("Items/WomensClothing/Blouses/{id?}")]
    public IActionResult Item(string id)
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ZofyaMVC.Models;
using ZofyaMVC.Data;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace ZofyaMVC.Controllers
{
    // [Authorize]
    public class AccessController : Controller
    {
        private readonly ILogger<AccessController> _logger;

        public AccessController(ILogger<AccessController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(Customer customer)
        {

            // string currentUserEmail = CurrentUser.GetUserEmail();

            // Claim userClaim = HttpContext.User.Claims.FirstOrDefault();

            // ViewData["UserTest"] = HttpContext.User.Claims.FirstOrDefault();


            // ViewData["UserTest"] = userClaim.Value;

            // ViewBag.UserEmail = ViewBag.UserEmail;
            DA_Customer _da_customer = new DA_Customer();

            // Customer customerFound = _da_customer.FindCustomer(currentUserEmail);


            return View(customer);
        }

        public async Task<IActionResult> LogOut()
        {

            // CurrentUser.SetUserEmail("");
            // ViewData["UserTest"] = CurrentUser.GetUserEmail();

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return View("Views/Home/LogIn.cshtml");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}



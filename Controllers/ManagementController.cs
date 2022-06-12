using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ZofyaMVC.Models;
using ZofyaMVC.Data;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ZofyaMVC.Controllers;

public class ManagementController : Controller
{    

    private readonly ILogger<HomeController> _logger;    
    private DA_Customer _da_customer = new DA_Customer();

    public ManagementController(ILogger<HomeController> logger)
    {
        _logger = logger;              
    }

    public IActionResult Index()
    {
        
        // SetUser();              

        return View();
    }
    
    [HttpPost]
    public async Task<IActionResult> LogIn(Customer customer)
    {
        SetUser();      
        
        var customerEmailField = customer.Email;
        var customerPasswordField = customer.Password;
                               
        if ((!String.IsNullOrEmpty(customerEmailField)) && (!String.IsNullOrEmpty(customerPasswordField)))
        {                                               

            // DA_Customer _da_customer = new DA_Customer();

            string customerPassword = Encrypt.GetSHA256(customer.Password);
            customer.Password = customerPassword;

            var customerExits = _da_customer.CustomerValidation(customer.Email, customer.Password);


            if (customerExits)
            {
                            
                ViewBag.InvalidCredentials = "";  
                Customer customerFound = _da_customer.FindCustomer(customer.Email);

                if (customerFound != null)
                {                    
                    
                    var claims = new List<Claim>{
                        
                        new Claim("Email", customer.Email),
                        new Claim("Name", customerFound.FullName),
                        new Claim("ID", customerFound.IDUser.ToString())                        
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity),
                                                  new AuthenticationProperties { ExpiresUtc = DateTime.Now.AddMinutes(5), IsPersistent = true}  );                                                           

                    ViewData["User"] = customerFound.Email;

                    // return View("Views/Access/Index.cshtml", customerFound);                                                     
                    return RedirectToAction("Index", "Home");
                   
                }
                else
                {
                    return View("Views/Home/LogIn.cshtml");                    
                }
                
            }
            else
            {                             
                ViewBag.InvalidCredentials = "Invalid nickname and/or password";                

                return View("Views/Home/LogIn.cshtml");                
            }
        }
        else
        {

            if(!ModelState.IsValid){
                
                ViewBag.EmailUser = String.IsNullOrEmpty(customer.Email);
                ViewBag.PasswordUser = String.IsNullOrEmpty(customer.Password);
                
            }

            return View("Views/Home/LogIn.cshtml");           

        }                                    
    }

    public async void SetUser()
    {
        Claim userClaim = HttpContext.User.Claims.FirstOrDefault();
        
        if (userClaim != null)
        {
            Claim userNameClaim = HttpContext.User.Claims.ElementAt(1);
            string userName = userNameClaim.Value;
            ViewData["User"] = userName;              

            Claim userIDClaim = HttpContext.User.Claims.ElementAt(2); 
            // System.Console.Error.WriteLine(userIDClaim.Value);           
            string userID = userIDClaim.Value;
            // ViewData["UserWishList"] = _da_customer.WishListNumber(userID);
            // await GetWishListAsync(userId);                            
                                                         
            // ViewData["UserShoppingCart"] = _da_customer.ShoppingCartNumber(userID);
            ShoppingCart userShoppingCart = _da_customer.GetUserShoppingCart(userID);
            int productCounter = _da_customer.GetShoppingCartProductsNumber(userShoppingCart.IDShoppingCart);
            
            if (productCounter > 0)
            {
                ViewData["UserShoppingCart"] = productCounter;
            }


        }
        else
        {
            ViewData["User"] = "Account";                
        }            
    }

    public async Task GetWishListAsync(string idUser)
    {
        
        List<WishList> wishList = new List<WishList>();
        Int32 wishListNumber = new Int32();

        try
        {

            var handler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = 
                HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            

            HttpClient client = new HttpClient(handler);
            client.BaseAddress = new Uri("https://localhost:7004/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json")); 
            
            HttpResponseMessage response = await client.GetAsync($"WishListNumber/{idUser}");
            
            if (response.IsSuccessStatusCode)
            {
               
                wishListNumber = await response.Content.ReadAsAsync<Int32>();
                
                // System.Console.Error.WriteLine(wishList[0].Name);
                // System.Console.Error.WriteLine(wishList[0].IDUser);
                
            }                        

        }
        catch (Exception e)
        {
            System.Console.Error.WriteLine(e);           
        }           
           
        // System.Console.Error.WriteLine(wishListNumber);
        ViewData["UserWishList"] = wishListNumber;
        
    }

    public async Task<IActionResult> LogOut()
    {
                
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);             

        return RedirectToAction("LogIn", "Home");
    }
  
    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

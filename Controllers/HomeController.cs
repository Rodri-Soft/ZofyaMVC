using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ZofyaMVC.Models;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ZofyaMVC.Controllers;

public class HomeController : Controller
{    

    private readonly ILogger<HomeController> _logger;    
    
    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;              
    }

    public async Task<IActionResult> Index()
    {
        
        await SetUser();              

        return View();
    }

    public async Task<IActionResult>  LogIn()
    {
       
        await SetUser();                  

        return View();
    }   

    [HttpPost]
    public async Task<IActionResult> LogInForm(Customer customer)
    {
        await SetUser();      
        
        var customerEmailField = customer.Email;
        var customerPasswordField = customer.Password;
                               
        if ((!String.IsNullOrEmpty(customerEmailField)) && (!String.IsNullOrEmpty(customerPasswordField)))
        {                                                           

            string customerPassword = Encrypt.GetSHA256(customer.Password);
            customer.Password = customerPassword;
                        
            var customerFound = await PostFindCustomerAsync(customer.Email, customer.Password);

            if (customerFound != null)
            {
                            
                ViewBag.InvalidCredentials = "";                                   
                
                var claims = new List<Claim>{
                    
                    new Claim("Email", customer.Email),
                    new Claim("Name", customerFound.FullName),
                    new Claim("ID", customerFound.IDUser.ToString())                        
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity),
                                                new AuthenticationProperties { ExpiresUtc = DateTime.Now.AddMinutes(5), IsPersistent = true}  );                                                           

                                                                                     
                return RedirectToAction("Index", "Home");                                   
                
            }
            else
            {                             
                ViewBag.InvalidCredentials = "Invalid email and/or password";                

                return View("Views/Home/LogIn.cshtml");                
            }
        }
        else
        {

            if(!ModelState.IsValid){
                
                return View("Views/Home/LogIn.cshtml");    
                
            }

            return View("Views/Home/LogIn.cshtml");           

        }                                    
    }

    public async Task SetUser()
    {
        Claim userClaim = HttpContext.User.Claims.FirstOrDefault();
        
        if (userClaim != null)
        {
            Claim userNameClaim = HttpContext.User.Claims.ElementAt(1);
            string userName = userNameClaim.Value;
            ViewData["User"] = userName;              

            Claim userIDClaim = HttpContext.User.Claims.ElementAt(2);                        
            string userID = userIDClaim.Value;                                                                                                                                   
            
            ShoppingCart userShoppingCart = await PostUserShoppingCartAsync(userID); 
            ViewData["IDShoppingCart"] = userShoppingCart.IDShoppingCart;

            int productCounter = await PostShoppingCartProductsNumberAsync(
                                        userShoppingCart.IDShoppingCart.ToString());
            
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

    public async Task<ShoppingCart> PostUserShoppingCartAsync(string idUser)
    {
        
        ShoppingCart shoppingCart = new ShoppingCart();

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

            HttpResponseMessage response = await client.PostAsJsonAsync(
                                                "PostUserShoppingCart", new {ID=idUser.ToString()});
                        
            if (response.IsSuccessStatusCode)
            {               
                shoppingCart = await response.Content.ReadAsAsync<ShoppingCart>();                                                
            }                        

        }
        catch (Exception e)
        {
            System.Console.Error.WriteLine(e);           
        }           
                   
        return shoppingCart;        
    }

    public async Task<Int32> PostShoppingCartProductsNumberAsync(string idShoppingCart)
    {
        
        Int32 shoppingCartProductsNumber =  new Int32();

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

            HttpResponseMessage response = await client.PostAsJsonAsync(
                                                "PostShoppingCartProductsNumber", new {ID=idShoppingCart.ToString()});
                        
            if (response.IsSuccessStatusCode)
            {               
                shoppingCartProductsNumber = await response.Content.ReadAsAsync<Int32>();                                                
            }
            else
            {
                shoppingCartProductsNumber = 0;
            }                        

        }
        catch (Exception e)
        {
            System.Console.Error.WriteLine(e);   
            shoppingCartProductsNumber = 0;        
        }           
                   
        return shoppingCartProductsNumber;        
    }

    public async Task<Customer> PostFindCustomerAsync(string email, string password)
    {
        
        Customer customer = new Customer();

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

            HttpResponseMessage response = await client.PostAsJsonAsync(
                                    "PostFindCustomer", new {Email=email.ToString(), Password=password.ToString()});
                        
            if (response.IsSuccessStatusCode)
            {               
                customer = await response.Content.ReadAsAsync<Customer>();                                                
            }                        

        }
        catch (Exception e)
        {
            System.Console.Error.WriteLine(e);           
        }           
                   
        return customer;        
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

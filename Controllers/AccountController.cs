using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ZofyaMVC.Models;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

using System.Net.Http.Headers;

namespace ZofyaMVC.Controllers;


[Authorize]
public class AccountController : Controller
{    

    private readonly ILogger<AccountController> _logger;    
    
    public AccountController(ILogger<AccountController> logger)
    {
        _logger = logger;              
    }

    public async Task<IActionResult> Index()
    {
        
        await UpdateUserInformation();
        await SetUser();               

        return View();
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

            Claim userEmailClaim = HttpContext.User.Claims.ElementAt(0);                        
            string userEmail = userEmailClaim.Value;           

            ViewData["UserClientEmail"] = userEmail;                                                                                                                      
            
            ShoppingCart userShoppingCart = await PostUserShoppingCartAsync(userID);                        
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

    public async Task<IActionResult> UpdateUserInformation()
    {
        Claim userClaim = HttpContext.User.Claims.FirstOrDefault();
        Customer updatedCustomer = new Customer();
        string userEmail = "";
        
        if (userClaim != null)
        {            
           
            Claim userEmailClaim = HttpContext.User.Claims.ElementAt(0);                        
            userEmail = userEmailClaim.Value;                                                             
        
        }
        else
        {
            ViewData["UserClientEmail"] = "Account";                
        }                  

        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);   

        updatedCustomer = await PostFindCustomerEmailAsync(userEmail);

        var claims = new List<Claim>{

            new Claim("Email", updatedCustomer.Email),
            new Claim("Name", updatedCustomer.FullName),
            new Claim("ID", updatedCustomer.IDUser.ToString())
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity),
                                        new AuthenticationProperties { ExpiresUtc = DateTime.Now.AddMinutes(5), IsPersistent = true });
        
        
        return RedirectToAction("Index", "Account");
    }

    public async Task<Customer> PostFindCustomerEmailAsync(string email)
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
                            "PostFindCustomerEmail", new { ID = email.ToString() });

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

    
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

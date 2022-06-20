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

public class ItemsController : Controller
{
  private readonly ILogger<ItemsController> _logger;

  public ItemsController(ILogger<ItemsController> logger)
  {
    _logger = logger;
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
        "PostUserShoppingCart", new { ID = idUser.ToString() }
      );

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

    Int32 shoppingCartProductsNumber = new Int32();

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
        "PostShoppingCartProductsNumber", new { ID = idShoppingCart.ToString() }
      );

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

  public async Task<List<WishList>> PostUserWishesListAsync(string idUser)
  {
    List<WishList> wishesLists = new List<WishList>();
    var handler = new HttpClientHandler()
    {
      ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
    };

    HttpClient httpClient = new HttpClient(handler);
    httpClient.BaseAddress = new Uri("https://localhost:7004/");
    httpClient.DefaultRequestHeaders.Accept.Clear();
    httpClient.DefaultRequestHeaders.Accept.Add(
      new MediaTypeWithQualityHeaderValue("application/json")
    );

    HttpResponseMessage response = await httpClient.PostAsJsonAsync(
      "PostUserWishesList", new { ID = idUser }
    );

    if (response.IsSuccessStatusCode)
    {
      wishesLists = await response.Content.ReadAsAsync<List<WishList>>();
    }

    return wishesLists;
  }

  public async Task SetUser() 
  {
    var userClaim = HttpContext.User.Claims.FirstOrDefault();

    if (userClaim != null)
    {
      Claim userNameClaim = HttpContext.User.Claims.ElementAt(1);
      string userName = userNameClaim.Value;
      ViewData["User"] = userName;

      Claim userIDClaim = HttpContext.User.Claims.ElementAt(2);
      string userID = userIDClaim.Value;

      List<WishList> wishList = await PostUserWishesListAsync(userID);
      ViewData["UserWishesList"] = wishList;


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

  [Route("Items/WomensClothing/Blouses")]
  public async Task<IActionResult> WomensClothing()
  {
    await SetUser();

    return View();
  }

  [Route("Items/WomensClothing/Blouses/{id?}")]
  public async Task<IActionResult> Item(string id)
  {
    await SetUser();

    return View();
  }

  [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
  public IActionResult Error()
  {
    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
  }
}

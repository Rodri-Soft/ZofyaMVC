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
using ZofyaMVC.ModelValidations;
using Microsoft.AspNetCore.Authorization;

namespace ZofyaMVC.Controllers;

[Authorize]
public class ClientController : Controller
{
  private readonly ILogger<CartController> _logger;

  public ClientController(ILogger<CartController> logger)
  {
    _logger = logger;
  }

  public async Task<List<Order>> PostUserOrderAsync(string idUser)
  {
    List<Order> orders = new List<Order>();
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
      "PostUserOrder", new { ID = idUser }
    );

    if (response.IsSuccessStatusCode)
    {
      orders = await response.Content.ReadAsAsync<List<Order>>();
    }

    return orders;
  }

  public async Task<List<Item_WishList>> PostUserItemsWishListAsync(string idUser)
  {
    List<Item_WishList> item_WishLists = new List<Item_WishList>();
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
      "PostItemWishlist", new { ID = idUser }
    );

    if (response.IsSuccessStatusCode)
    {
      item_WishLists = await response.Content.ReadAsAsync<List<Item_WishList>>();
    }

    return item_WishLists;
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

  public async Task<List<Address>> PostUserAddressAsync(string idUser)
  {
    List<Address> addresses = new();
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
      "PostCustomerAddress", new { ID = idUser }
    );

    if (response.IsSuccessStatusCode)
    {
      addresses = await response.Content.ReadAsAsync<List<Address>>();
    }

    return addresses;
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

  public async Task<ShoppingCart> PostUserShoppingCartAsync(string idUser) {
    ShoppingCart shoppingCart = new();
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
      "PostUserShoppingCart", new { ID = idUser }
    );

    if (response.IsSuccessStatusCode)
    {
      shoppingCart = await response.Content.ReadAsAsync<ShoppingCart>();
    }

    return shoppingCart;
  }

  public async Task<List<AuxiliaryItemShoppingCart>> PostUserItemShoppingCartAsync(string idUser)
  {
    List<AuxiliaryItemShoppingCart> itemShoppingCarts = new List<AuxiliaryItemShoppingCart>();
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
      "PostUserItemShoppingCart", new { ID = idUser }
    );

    if (response.IsSuccessStatusCode)
    {
      itemShoppingCarts = await response.Content.ReadAsAsync<List<AuxiliaryItemShoppingCart>>();
    }

    return itemShoppingCarts;
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
      ViewData["userID"] = userID;


      List<AuxiliaryItemShoppingCart> itemShoppingCarts = await PostUserItemShoppingCartAsync(userID);
      ShoppingCart shoppingCart = await PostUserShoppingCartAsync(userID);

      ViewData["ShoppingCart"] = shoppingCart;
      ViewData["ItemShoppingCart"]  = itemShoppingCarts;

      ShoppingCart userShoppingCart = await PostUserShoppingCartAsync(userID);
      ViewData["IDShoppingCart"] = userShoppingCart.IDShoppingCart;
      int productCounter = await PostShoppingCartProductsNumberAsync(
        userShoppingCart.IDShoppingCart.ToString());

      if (productCounter > 0)
      {
        ViewData["UserShoppingCart"] = productCounter;
      }

      List<Address> address = await PostUserAddressAsync(userID);
      ViewData["CustomerAddress"] = address;

      List<WishList> wishLists = await PostUserWishesListAsync(userID);
      ViewData["WishListUser"] = wishLists;

      List<Item_WishList> item_WishLists = await PostUserItemsWishListAsync(userID);
      ViewData["itemWishList"] = item_WishLists;

      List<Order> orders = await PostUserOrderAsync(userID);
      ViewData["OrderUser"] = orders;
    }
  }

  [Route("Pedidos")]
  public async Task<IActionResult> Orders()
  {
    await SetUser();

    return View();
  }

  [Route("Wishlist")]
  public async Task<IActionResult> Wishlist()
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

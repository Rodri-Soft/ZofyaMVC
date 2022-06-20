const urlServer = "https://localhost:7004";
const sku = localStorage.getItem("sku")
const imageSelected = document.querySelector("#item-image-selected");
// const toastTrigger = document.getElementById('button-add-item')
const sucessTost = document.getElementById('sucessToast')
const errorToast = document.getElementById('errorToast')
const idShoppingCart = parseInt($("#user-shopping-cart").attr("data-id"));

let item;
let selectedSize;


$(function() {
  $.ajax({
    method: "GET",
    url: urlServer + "/Item/Woman/" + sku,
    contentType: "application/json",
    success: function(data) {
      item = data;      
      showItem(item);
    }  
  });
});

function reloadPage() {
  window.location.reload();
}

function showItem(item) {  
  imageSelected.setAttribute("src", item.images[0]);

  for (let i = 0; i < item.images.length; i++) {
    let imageID = "#item-image-" + (i + 1);
    document.querySelector(imageID).setAttribute("src", item.images[i]);
  }

  document.getElementById("item-name-navigation").textContent = item.name;
  document.getElementById("item-name").textContent = item.name;
  document.getElementById("item-name").textContent = item.name;
  document.getElementById("item-sku").textContent = "Código de Producto: " + item.sku;
  document.getElementById("item-price").textContent = "$" + item.price + " MXN";
  document.getElementById("item-description").textContent = item.description;
  document.getElementById("item-care").textContent = item.care;

  getItemColors(item);
  getItemSizes(item);
}

function getItemColors(item) {
  let colors = item.colors;

  for (const color of colors) {
    document.querySelector("#item-colors").innerHTML += 
    `<div class="circle">
      <div class="item-color" style="background-color: ${color}";"></div>
    </div>`;      
  }   
}

function getItemSizes(item) {
  let sizes = item.sizes;
  let count = 1;

  for (const size of sizes) {
    document.querySelector("#item-sizes").innerHTML += 
    `<div id="item-size-${count}" class="item-size" onclick="changeSelectedSize(this)">${size}</div>`;      
    count++;
  }   
}

function changeSelectedImage(element) {
  let elementID = "#" + element.id;
  let imageURL = document.querySelector(elementID).getAttribute("src");

  imageSelected.setAttribute("src", imageURL);
}

function changeSelectedSize(element) {
  let selectedSizeButton ;
  let sizes = document.getElementsByClassName("item-size");
  
  for (const div of sizes) {
    div.style.backgroundColor = "#f7f7f7";
    div.style.color = "#000";
  }

  if (element !== null) {
    selectedSizeButton = document.getElementById(element.id);
    selectedSize = selectedSizeButton.textContent;

    selectedSizeButton.style.backgroundColor = "#000";
    selectedSizeButton.style.color = "#FFF";
  }
}

function updateItemQuantity() {
  let updateInformation = {
    "shoppingCartID": idShoppingCart,
    "sku": item.sku,
    "size": selectedSize,
  };

  $.ajax({
    method: "PATCH",
    url: urlServer + "/UpdateCartProductQuantity",
    contentType: "application/json",
    data: JSON.stringify(updateInformation)
  }).done(function(data) {
    if (data.correct) {
      selectedSize = undefined; 
      toast = new bootstrap.Toast(sucessToast);   
      toast.show();
      changeSelectedSize(null);
      // setTimeout(reloadPage, 1500);
    }
  }).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus, true);
  });
}

function addItemToCart() {
  let toast;
  let itemShoppingCart = {
    "IDShoppingCart": idShoppingCart,
    "SKU": item.sku,
    "QuantityOfItems": 1,
    "TotalItem": item.price,
    "SizeSelected": selectedSize
  };

  if (selectedSize !== undefined) {
    $.ajax({
      method: "POST",
      url: urlServer + "/RegisterItemShoppingCart",
      contentType: "application/json",
      data: JSON.stringify(itemShoppingCart)
    }).done(function(data) {
      if (data.correct) {
        selectedSize = undefined; 
        toast = new bootstrap.Toast(sucessToast);   
        toast.show();
        changeSelectedSize(null);
        setTimeout(reloadPage, 1500);
      } else if (data.field.length > 0) {
        for (const field of data.field) {
          if (field === "Repeated Item") {
            updateItemQuantity();
          }
        }
      }
    }).fail(function (jqXHR, textStatus) {
      console.log(jqXHR, textStatus, true);
    });
  } else {
    toast = new bootstrap.Toast(errorToast);
    toast.show();
  }  
}

function addItemToWishList(element) {
  let wishList = document.getElementById(element.id);
  let itemWishList = {
    "IDWishList": Number(wishList.value),
    "SKU": item.sku
  };

  $.ajax({
    method: "POST",
    url: urlServer + "/RegisterItemInWishList",
    contentType: "application/json",
    data: JSON.stringify(itemWishList)
  }).done(function(data) {
    if (data.correct) {
      document.getElementById("toast-body-sucess").textContent = 
        `El Producto ${item.name} fue agregado a la lista de deseos.`;
      toast = new bootstrap.Toast(sucessToast);   
      toast.show();
      changeSelectedSize(null);
      // setTimeout(reloadPage, 1500);
    } else if (data.field.length > 0) {
      for (const field of data.field) {
        if (field === "Repeated Item") {
          document.getElementById("toast-body-error").textContent = 
            `El producto ${item.name} ya se encuentra en la lista de deseos.`;
          toast = new bootstrap.Toast(errorToast);   
          toast.show();          
        }
      }
    }
  }).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus, true);
  });
}
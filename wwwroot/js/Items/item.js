const urlServer = "https://localhost:7004";
const sku = localStorage.getItem("sku")
const imageSelected = document.querySelector("#item-image-selected");

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

  $.ajax({
    method: "GET",
    url: urlServer + "/Items/Woman",
    contentType: "application/json",
    success: function(data) {
      // item = data;      
      // showItem(item);
    }  
  });
});

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
  document.getElementById("button-add-item").dataset.id = item.sku;;

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
  let selectedSizeButton = document.getElementById(element.id);
  let sizes = document.getElementsByClassName("item-size");

  for (const x of sizes) {
    x.style.backgroundColor = "#f7f7f7";
    x.style.color = "#000";
  }

  selectedSizeButton.style.backgroundColor = "#000";
  selectedSizeButton.style.color = "#FFF";
}


const urlServer = "https://localhost:7004";

const itemContainer = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const actualURL = window.location.href;
let items = [];
let selectedFilters = [];
let selectedOrder; 

$(function() {
  let container = $('#pagination-container');
  container.pagination({
    dataSource: function(done) {
      $.ajax({
        method: "GET",
        url: urlServer + "/Items/Woman/Blouses",
        // dataType: "JSON",
        // cache: false, 
        // processData: false,
        contentType: "application/json",
        // data: null,
        success: function(data) {
          done(data); 
          data.forEach(function(item){
            items.push(item);
          }) 
        }  
      }).fail(function() {
        // alert("Servidor caido...");
      });
    },
    pageSize: 3,    
    callback: function(data, pagination) {
      showItems(data);
    }
  });
})

const showItems = data => {
  data.forEach(item => {   
    let images = item.images;
    let colors = item.colors;
    getItemSizes(item);

    templateCard.querySelector("#item-image").setAttribute("src", images[0]);      
    templateCard.querySelector("#item-name").textContent = item.name;
    templateCard.querySelector("#item-price").textContent = `$${item.price} MXN`;      
    templateCard.querySelector("#item-color").style.backgroundColor = colors[0];      
    templateCard.querySelector("#button-add-item").dataset.id = item.sku;
    templateCard.querySelector("#item-image").dataset.id = item.sku;
    templateCard.querySelector('#item-achor').dataset.id = item.sku;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  })
  $("#items").empty()
  itemContainer.appendChild(fragment);
} 

function getItemSizes(item) {
  templateCard.querySelector("#item-sizes").innerHTML = "";
  let sizes = item.sizes;

  for (const size of sizes) {
    templateCard.querySelector("#item-sizes").innerHTML += `<div>${size}</div>`;      
  }   
}

const selectedFiltersContainer = document.querySelector("#selected-filters");
const sizeFilter = document.getElementById('filter-size');
const colorFilter = document.getElementById('filter-color');
const priceFilter = document.getElementById('filter-price');
const orderFilter = document.getElementById('filter-order');

orderFilter.addEventListener('change',
  function() {
    selectedOrder = (this.options[orderFilter.selectedIndex]).value;
    sortItemList();
  }
);

sizeFilter.addEventListener('change',
  function() {
    let sizeFilterSelection = (this.options[sizeFilter.selectedIndex]).value;    

    if (selectedFilters.length === 0) {
      selectedFiltersContainer.innerHTML = 
        `<span>
          <strong><small>FILTROS SELECCIONADOS:</small></strong>
        </span>`;          
    }

    if (!selectedFilters.includes(sizeFilterSelection)) {
      selectedFilters.push(sizeFilterSelection);      
      selectedFiltersContainer.innerHTML += 
        `<button id=${sizeFilterSelection} 
                onclick="removeSelectedFilter(this.id)">          
          <i class="fas fa-times fa-xs"></i>
          <small>${sizeFilterSelection}</small>          
        </button>`;        
    }    
    
    sizeFilter.value = "SIZE";
    sortItemList();
  }
);

colorFilter.addEventListener('change',
  function() {
    let colorFilterSelection = (this.options[colorFilter.selectedIndex]).value;
    let filterText = (this.options[colorFilter.selectedIndex]).text;

    if (selectedFilters.length === 0) {
      selectedFiltersContainer.innerHTML = 
        `<span>
          <strong><small>FILTROS SELECCIONADOS:</small></strong>
        </span>`;        
    }

    if (!selectedFilters.includes(colorFilterSelection)) {
      selectedFilters.push(colorFilterSelection);      
      selectedFiltersContainer.innerHTML += 
        `<button id=${colorFilterSelection} 
                onclick="removeSelectedFilter(this.id);">
          <i class="fas fa-times fa-xs"></i>
          <small>${filterText}</small>
        </button>`;        
    }    
    
    colorFilter.value = "COLOR";
    sortItemList();
  }
);

priceFilter.addEventListener('change',
  function() {
    let priceFilterSelection = (this.options[priceFilter.selectedIndex]).value;
    let filterText = (this.options[priceFilter.selectedIndex]).text;

    if (selectedFilters.length === 0) {
      selectedFiltersContainer.innerHTML = 
        `<span>
          <strong><small>FILTROS SELECCIONADOS:</small></strong>
        </span>`;         
    }

    if (!selectedFilters.includes(priceFilterSelection)) {
      selectedFilters.push(priceFilterSelection);      
      selectedFiltersContainer.innerHTML += 
        `<button id=${priceFilterSelection}
                onclick="removeSelectedFilter(this.id)">
          <i class="fas fa-times fa-xs"></i>
          <small>${filterText}</small>
        </button>`;        
    }    
    
    priceFilter.value = "PRICE";
    sortItemList();
  }
);

function orderList(auxiliaryList) {
  if (selectedOrder === "alphabetically-ascending") {
    auxiliaryList = auxiliaryList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedOrder === "alphabetically-descending") {
    auxiliaryList = auxiliaryList.sort((a, b) => a.name.localeCompare(b.name)).reverse();
  } else if (selectedOrder === "high-price") {
    auxiliaryList = auxiliaryList.sort((a, b) => a.price - b.price).reverse();
  } else {
    auxiliaryList = auxiliaryList.sort((a, b) => a.price - b.price);
  }

  return auxiliaryList;
}

function sortItemList() {  
  $("#items").empty();
  let filteredItems = [];
  let orderIsSelected = selectedOrder !== undefined;

  if (orderIsSelected) {
    items = orderList(items);
  }

  for (const filter of selectedFilters) {
    items.forEach(function (item) {
      let sizes = item.sizes;            
      sizes.forEach(function(size) {
        if ((size === filter) && !filteredItems.includes(item)) {
          filteredItems.push(item);      
        }
      });
      
      let colors = item.colors;
      colors.forEach(function(color) {
        if ((color === filter) && !filteredItems.includes(item)) {
          filteredItems.push(item);                
        }
      });
      
      priceOption = Number(filter);

      let auxiliary = 
      priceOption === 1 ? items.filter(item => item.price >= 99 && item.price <= 199) :
      priceOption === 2 ? items.filter(item => item.price >= 200 && item.price <= 299) :
      priceOption === 3 ? items.filter(item => item.price >= 300 && item.price <= 399) :
      priceOption === 4 ? items.filter(item => item.price >= 400) :
      null;

      if (auxiliary !== null) {
        auxiliary.forEach(function(item) {
          if (!filteredItems.includes(item)) {
            filteredItems.push(item);
          }
        });
      }
    });             
  }  

  if (selectedFilters.length === 0 && orderIsSelected) {
    filteredItems = items;
  } else if (filteredItems.length > 0 && orderIsSelected) {
    filteredItems = orderList(filteredItems);
  }

  let container = $('#pagination-container');
  container.pagination({
    dataSource: filteredItems,
    pageSize: 3, 
    callback: function(data, pagination) {
      showItems(data);
    }
  });
  
  if ((filteredItems.length === 0) && (selectedFilters.length !== 0)) {
    $("#items").empty();
    itemContainer.innerHTML = 
    `<h2 class="brand-zofya brand-zofya-logo display-1 text-center">ZOFYA</h2>
    <h4 class="text-center">No se encontraron resultados.</h4>`;   
  }  
}

function removeSelectedFilter(elementId){
  let filterRemoved = document.getElementById(elementId);
  let auxiliary = selectedFilters.filter(filter => filter !== elementId)
  selectedFilters = auxiliary;
  
  if (selectedFilters.length === 0) {
    selectedFiltersContainer.innerHTML = "";
    showItems(items);
  } else {
    sortItemList();
  }
  
  filterRemoved.remove();
}

function getURL(sku) {  
  localStorage.setItem("sku", sku);
  let auxiliarySku = parseInt(sku);
  let newURL = actualURL + "/" + sku;

  window.location.href = newURL;
}
const urlServer = "https://localhost:7004";

const titleModal = document.getElementById("modal-title");
const containerWishList =  document.getElementById("container-wishlist");
const containerItems = document.getElementById("container-items-wishlist");

let wishListIDSelected;

$(document).ready(function () {
  $("#validation-wishlist-name").keydown(function (event) {
    validateWishListName();
  });
  $("#validation-wishlist-name").keyup(function (event) {
    validateWishListName();
  });
  $("#validation-wishlist-name").blur(function (event) {
    validateWishListName();
  });
});

function changeValidField(field) {
  $("#validation-wishlist-" + field).removeClass("is-invalid");
  $("#validation-wishlist-" + field).addClass("is-valid");
}

function changeInValidField(field) {
  $("#validation-wishlist-" + field).removeClass("is-valid");
  $("#validation-wishlist-" + field).addClass("is-invalid");
}

function validateWishListName() {
  let wishlistNameField = $("#validation-wishlist-name").val();
  let maxLength = 50;
  let isCorrect = true;
  let wishListNameLength = wishlistNameField.length;
  const pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);

  if (!pattern.test(wishlistNameField)) {      
      isCorrect = false;
      let field = document.getElementById("invalid-wishlist-name");
      field.innerHTML = "Invalid Wish List Name Format.";
  }

  if ((wishlistNameField === "") || (maxLength < wishListNameLength)) {
    isCorrect = false;
    let field = document.getElementById("invalid-wishlist-name");

    if (wishlistNameField === "") {
        field.innerHTML = "Wish List Name Field Required";
    } else {
        field.innerHTML = "Maximum length of 50 characters";
    }
  }

  if (!isCorrect) {
    changeInValidField("name")
  } else {
    changeValidField("name")
  }

  return isCorrect;
}

function cleanFields(field) {
  $("#validation-wishlist-" + field).val("");
  $("#validation-wishlist-" + field).removeClass("active");
  $("#validation-wishlist-" + field).removeClass("is-valid");
}

function emptyInvalidFields() {
  let wishListNameField = document.getElementById("invalid-wishlist-name");
  wishListNameField.innerHTML = "";
}

function showCorrectFields(fields) {
  fields.forEach(field => {
    switch (field) {
      case "name":
        $("validation-wishlist-name").removeClass("is-inValid");
        $("validation-address-name").addClass("is-valid");
      break;

      default:
        break;
    }
  });
}

function showMistakesField(errorFields) {
  let fields = ["name"];
  let fieldIndex;

  if (errorFields != null) {

    errorFields.forEach(field => {
        switch (field) {
          case "name":
            $("validation-wishlist-name").removeClass("is-Valid");
            $("validation-wishlist-name").addClass("is-invalid");
    
            fieldIndex = fields.findIndex(f => f === "name");
    
            fields.splice(fieldIndex, 1);
          break;
          
          default:
            break;
        }
    });

    showCorrectFields(fields);
  }
}

function showItemsWishList() {
  $.ajax({
    method: "GET",
    url: urlServer + "/Items/Wishlist/" + wishListIDSelected,
    contentType: "application/json",
    success: function(data) {
      containerItems.innerHTML = "";
      data.forEach(function(item) {  
        containerItems.innerHTML += `
        
          <div class="col-md-3 h-100 container-items-wishlist m-4 p-6">
            <div class="row p-2">
                <img class="img-fluid p-4" src="${item.imageURL}">    
            </div>

            <div class="row px-3">
              <p class="col-10">${item.name}</p>
              <div class="col-2 d-flex justify-content-end">
                  <i class="fa-solid fa-trash-can fs-4" style="color: #c66; cursor: pointer" data-id="${item.idItemWishList}" onclick="deleteItemWishList(${item.idItemWishList});"></i>
              </div>
            </div>

            <div class="row px-3">
              <p>${item.sku}</p>
            </div>

            <div class="row mb-3">
              <div class="col-6">
                <p class="text-center">Color Principal</p>
                <div class="circle">
                  <div class="item-color" style="background-color: ${item.color}"></div>
                </div>
              </div>
            
              <div class="col-6">
                <p class="text-center">Precio</p>
                <div class="text-center">
                  <strong>$ ${item.price} MXN</strong>
                </div>
              </div>
            </div>
          </div>
        `
      });      
    }  
  });
}

function showSelectedWishList(element) {
  let dataID = $(`#${element.id}`).attr("data-id");
  let information = dataID.split('/')

  wishListIDSelected = information[0];
  let wishlistName = information[1];

  containerWishList.innerHTML = `<div class="wishlist-selected my-0 p-2 display-6 text-center" id="wish-selected">${wishlistName}</div>`;

  showItemsWishList();
}

function showModalRegisterWishList() {
  $("#modal-add-wish-list").modal("show");
}

function reloadPage() {
  window.location.reload();
}

function showSuccessAlert(successMessages, isCorrect) {      
  $("#modalCorrectMessage").find(".modal-body").empty();

  if (isCorrect) {
    titleModal.innerHTML = "Registro exitoso";
    successMessages.forEach(message => {    
      $("#modalCorrectMessage").find(".modal-body").html(`
          <i class="fa-regular fa-circle-check fa-3x fa-beat-fade" style="color:green"></i>
          <br>
          <br>
          ${message}        
      `);     
    });
  } else {
    titleModal.innerHTML = "Wish List No Seleccionada";
    successMessages.forEach(message => {    
      $("#modalCorrectMessage").find(".modal-body").html(`
          <i class="fa-regular fa-circle-xmark fa-3x fa-beat-fade" style="color:red"></i>
          <br>
          <br>
          ${message}        
      `);     
    });
  }
  
  $('#modalCorrectMessage').modal('show');    
}

function addWishList(userID) {
  // let wishListName = $("validation-wishlist-name").val();
  
  let validationResult = true;
  let validationFieldsResults = [];
  
  validationFieldsResults.push(validateWishListName()); 

  let result = validationFieldsResults.includes(false);
  
  if (result) {
    validationResult = false;
  }
  
  if (validationResult) {  
    let wishListName = document.getElementById("validation-wishlist-name").value;

    let wishlist = {
      "idUser": userID,
      "name": wishListName
    };
    
    // console.table(wishlist);

    $.ajax({
      method: "POST",
      url: urlServer + "/RegisterWishList",
      contentType: "application/json",
      data: JSON.stringify(wishlist)
    }).done(function (data) {
      if (data.correct) {
        $("validation-wishlist-name").val("");
        $("#modal-add-wish-list").hide();
        let fields = ["name"];
        showCorrectFields(fields);
  
        let messageSucess = [];
  
        messageSucess.push("Wish List Registrada Correctamente");
        showSuccessAlert(messageSucess, true);
        setTimeout(reloadPage, 2000);
      } else {
        let errorMessages = data.message;
        let errorFields = data.field;
  
        emptyInvalidFields();
        showMistakesField(errorFields);
      }
    }).fail(function (jqXHR, textStatus) {
      console.log(jqXHR, textStatus, true);
    });
  }
}

function deleteWishList() {
  if (wishListIDSelected === undefined) {
    let messageSucess = [];

    messageSucess.push("Selecciona una Wish List");
    showSuccessAlert(messageSucess, false);  
  } else {
    $.ajax({
      method: "DELETE",
      url: urlServer + "/DeleteWishList/" + wishListIDSelected,
      contentType: false,
      data: null
    }).done(function(data) {
      if (data.correct) {
        containerWishList.innerHTML = "";
        let messageSucess = [];

        messageSucess.push("Wish List Eliminada Correctamente");
        showSuccessAlert(messageSucess, true);  
        setTimeout(reloadPage, 1000);
      }
    }).fail(function (jqXHR, textStatus) {
      console.log(jqXHR, textStatus, true);
    });
  }
}

function deleteItemWishList(element) {
  $.ajax({
    method: "DELETE",
    url: urlServer + "/DeleteItemWishList/" + element,
    contentType: false,
    data: null
  }).done(function(data) {
    if (data.correct) {
      containerWishList.innerHTML = "";
      let messageSucess = [];

      messageSucess.push("Producto Eliminada Correctamente de la Wish List");
      showSuccessAlert(messageSucess, true);  
      setTimeout(reloadPage, 1000);
    }
  }).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus, true);
  });
}
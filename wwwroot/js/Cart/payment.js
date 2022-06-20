const urlServer = "https://localhost:7004";

const totalBalance = document.getElementById("total-balance").textContent;
const totalBalanceInteger = getNumbersInString(totalBalance);
const shoppingCartID = $("#shopping-cart-id").attr("data-id");
const customerID = $("#shopping-cart-customer").attr("data-id");
const titleModal = document.getElementById("modal-title");

let addressIDSelected;

function showIndex() {
  window.location.href = "/";
}

function getNumbersInString(string) {
  var tmp = string.split("");
  var map = tmp.map(function(current) {
    if (!isNaN(parseInt(current))) {
      return current;
    }
  });

  var numbers = map.filter(function(value) {
    return value != undefined;
  });

  return numbers.join("");
}

function reloadPage() {
  window.location.reload();
}

$(document).ready(function () {

  // Street Name
  $("#validation-address-street-name").keydown(function (event) {
    validateStreetName();
  });
  $("#validation-address-street-name").keyup(function (event) {
    validateStreetName();
  });
  $("#validation-address-street-name").blur(function (event) {
    validateStreetName();
  });

  // Colony
  $("#validation-address-colony").keydown(function (event) {
    validateColony();
  });
  $("#validation-address-colony").keyup(function (event) {
    validateColony();
  });
  $("#validation-address-colony").blur(function (event) {
    validateColony();
  });

  // Out Sider Number
  $("#validation-address-out-sider-number").keydown(function (event) {
    validateOutSiderNumber();
  });
  $("#validation-address-out-sider-number").keyup(function (event) {
    validateOutSiderNumber();
  });
  $("#validation-address-out-sider-number").blur(function (event) {
    validateOutSiderNumber();
  });

  // Insider Number
  $("#validation-address-insider-number").keydown(function (event) {
    validateInsiderNumber();
  });
  $("#validation-address-insider-number").keyup(function (event) {
    validateInsiderNumber();
  });
  $("#validation-address-insider-number").blur(function (event) {
    validateInsiderNumber();
  });
  
  // Postal Code
  $("#validation-address-postal-code").keydown(function (event) {
    validatePostalCode();
  });
  $("#validation-address-postal-code").keyup(function (event) {
    validatePostalCode();
  });
  $("#validation-address-postal-code").blur(function (event) {
    validatePostalCode();
  });

  // City 
  $("#validation-address-city").keydown(function (event) {
    validateCity();
  });
  $("#validation-address-city").keyup(function (event) {
    validateCity();
  });
  $("#validation-address-city").blur(function (event) {
    validateCity();
  });
  
});

function showModalRegisterAddress() {
  $("#modal-add-address").modal("show");
}

function changeValidField(field) {
  $("#validation-address-" + field).removeClass("is-invalid");
  $("#validation-address-" + field).addClass("is-valid");
}

function changeInValidField(field) {
  $("#validation-address-" + field).removeClass("is-valid");
  $("#validation-address-" + field).addClass("is-invalid");
}

function validateStreetName() {
  let streetNameField = $("#validation-address-street-name").val();
  let streetNameMaxLength = 50;
  let isCorrect = true;
  let streetNameLength = streetNameField.length;
  const pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);

  if (!pattern.test(streetNameField)) {      
      isCorrect = false;
      let field = document.getElementById("invalid-street-name");
      field.innerHTML = "Invalid Street Name Format.";
  }

  if ((streetNameField === "") || (streetNameLength > streetNameMaxLength)) {
    isCorrect = false;
    let field = document.getElementById("invalid-street-name");

    if (streetNameField === "") {
        field.innerHTML = "Street Name Field Required";
    } else {
        field.innerHTML = "Maximum length of 50 characters";
    }
  }

  if (!isCorrect) {
    changeInValidField("street-name")
  } else {
    changeValidField("street-name")
  }

  return isCorrect;
}

function validateColony() {
  let colonyField = $("#validation-address-colony").val();
  let colonyMaxLength = 50;
  let isCorrect = true;
  let colonyLength = colonyField.length;
  const pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);

  if (!pattern.test(colonyField)) {      
      isCorrect = false;
      let field = document.getElementById("invalid-colony");
      field.innerHTML = "Invalid Colony Format.";
  }

  if ((colonyField === "") || (colonyLength > colonyMaxLength)) {
    isCorrect = false;
    let field = document.getElementById("invalid-colony");

    if (colonyField === "") {
        field.innerHTML = "Colony Field Required";
    } else {
        field.innerHTML = "Maximum length of 50 characters";
    }
  }

  if (!isCorrect) {
    changeInValidField("colony")
  } else {
    changeValidField("colony")
  }

  return isCorrect;
}

function validateOutSiderNumber() {
  let outSiderNumberField = $("#validation-address-out-sider-number").val();
  let outSiderNumberMaxLength = 5;
  let isCorrect = true;
  let outSiderNumberLength = outSiderNumberField.length;
  const pattern = new RegExp(/^[0-9]*(\.?)[0-9]+$/);

  if (!pattern.test(outSiderNumberField)) {      
      isCorrect = false;
      let field = document.getElementById("invalid-out-sider-number");
      field.innerHTML = "Invalid Out Sider Number Format.";
  }

  if ((outSiderNumberField === "") || (outSiderNumberLength > outSiderNumberMaxLength)) {
    isCorrect = false;
    let field = document.getElementById("invalid-out-sider-number");

    if (outSiderNumberField === "") {
        field.innerHTML = "Out Sider Number Field Required";
    } else {
        field.innerHTML = "Maximum length of 5 characters";
    }
  }

  if (!isCorrect) {
    changeInValidField("out-sider-number")
  } else {
    changeValidField("out-sider-number")
  }

  return isCorrect;
}

function validateInsiderNumber() {
  let insiderNumberField = $("#validation-address-insider-number").val();
  let insiderNumberMaxLength = 5;
  let isCorrect = true;
  let insiderNumberLength = insiderNumberField.length;
  const pattern = new RegExp(/^[0-9]*(\.?)[0-9]+$/);

  if (!pattern.test(insiderNumberField)) {      
      isCorrect = false;
      let field = document.getElementById("invalid-insider-number");
      field.innerHTML = "Invalid Insider Number Format.";
  }

  if ((insiderNumberField === "") || (insiderNumberLength > insiderNumberMaxLength)) {
    isCorrect = false;
    let field = document.getElementById("invalid-insider-number");

    if (insiderNumberField === "") {
        field.innerHTML = "Insider Number Field Required";
    } else {
        field.innerHTML = "Maximum length of 5 characters";
    }
  }

  if (!isCorrect) {
    changeInValidField("insider-number")
  } else {
    changeValidField("insider-number")
  }

  return isCorrect;
}

function validatePostalCode() {
  let postalCodeField = $("#validation-address-postal-code").val();
  let postalCodeMaxLength = 5;
  let isCorrect = true;
  let postalCodeLength = postalCodeField.length;
  const pattern = new RegExp(/^[0-9]{5}$/);

  if (!pattern.test(postalCodeField)) {      
    isCorrect = false;
    let field = document.getElementById("invalid-postal-code");
    field.innerHTML = "Invalid Postal Code Format.";
  }

  if ((postalCodeField === "") || (postalCodeLength > postalCodeMaxLength)) {
    isCorrect = false;
    let field = document.getElementById("invalid-postal-code");

    if (postalCodeField === "") {
        field.innerHTML = "Postal Code Field Required";
    } else {
        field.innerHTML = "Maximum length of 5 characters";
    }
  }

  if (!isCorrect) {
    changeInValidField("postal-code")
  } else {
    changeValidField("postal-code")
  }

  return isCorrect;
}

function validateCity() {
  let cityField = $("#validation-address-city").val();
  let cityMaxLength = 50;
  let isCorrect = true;
  let cityLength = cityField.length;
  const pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);

  if (!pattern.test(cityField)) {      
      isCorrect = false;
      let field = document.getElementById("invalid-city");
      field.innerHTML = "Invalid City Format.";
  }

  if ((cityField === "") || (cityLength > cityMaxLength)) {
    isCorrect = false;
    let field = document.getElementById("invalid-city");

    if (cityField === "") {
        field.innerHTML = "City Field Required";
    } else {
        field.innerHTML = "Maximum length of 50 characters";
    }
  }

  if (!isCorrect) {
    changeInValidField("city")
  } else {
    changeValidField("city")
  }

  return isCorrect;
}

function cleanFields(field) {
  $("#validation-address-" + field).val("");
  $("#validation-address-" + field).removeClass("active");
  $("#validation-address-" + field).removeClass("is-valid");
}

function emptyInvalidFields() {
  let streetNameField = document.getElementById("invalid-street-name");
  let colonyField = document.getElementById("invalid-colony");
  let outSiderNumber = document.getElementById("invalid-out-sider-number");
  let insiderNumber = document.getElementById("invalid-insider-number");
  let postalCode = document.getElementById("invalid-postal-code");
  let city = document.getElementById("invalid-city");

  streetNameField.innerHTML = "";
  colonyField.innerHTML = "";
  outSiderNumber.innerHTML = "";
  insiderNumber.innerHTML = "";
  postalCode.innerHTML = "";
  city.innerHTML = "";
}

function showCorrectFields(fields) {
  fields.forEach(field => {
    switch (field) {
      case "streetName":
        $("validation-address-street-name").removeClass("is-inValid");
        $("validation-address-street-name").addClass("is-valid");
      break;
      
      case "colony":
        $("validation-address-colony").removeClass("is-inValid");
        $("validation-address-colony").addClass("is-valid");
      break;

      case "outSiderNumber":
        $("validation-address-out-sider-number").removeClass("is-inValid");
        $("validation-address-out-sider-number").addClass("is-valid");
      break;
        
      case "insiderNumber":
        $("validation-address-insider-number").removeClass("is-inValid");
        $("validation-address-insider-number").addClass("is-valid");
      break;

      case "postalCode":
        $("validation-address-postal-code").removeClass("is-inValid");
        $("validation-address-postal-code").addClass("is-valid");
      break;

      case "city":
        $("validation-address-city").removeClass("is-inValid");
        $("validation-address-city").addClass("is-valid");
      break;

      default:
        break;
    }
  });
}

function showMistakesField(errorFields) {
  let fields = ["streetName", "colony", "outSiderNumber", "insiderNumber", "postalCode", "city"];
  let fieldIndex;

  if (errorFields != null) {

    errorFields.forEach(field => {
        switch (field) {
          case "streetName":
            $("validation-address-street-name").removeClass("is-Valid");
            $("validation-address-street-name").addClass("is-invalid");
    
            fieldIndex = fields.findIndex(f => f === "streetName");
    
            fields.splice(fieldIndex, 1);
          break;
          
          case "colony":
            $("validation-address-colony").removeClass("is-Valid");
            $("validation-address-colony").addClass("is-invalid");
    
            fieldIndex = fields.findIndex(f => f === "colony");
    
            fields.splice(fieldIndex, 1);
          break;
        
          case "outSiderNumber":
            $("validation-address-out-sider-number").removeClass("is-Valid");
            $("validation-address-out-sider-number").addClass("is-invalid");
    
            fieldIndex = fields.findIndex(f => f === "outSiderNumer");
    
            fields.splice(fieldIndex, 1);
          break;
          
          case "insiderNumber":
            $("validation-address-insider-number").removeClass("is-Valid");
            $("validation-address-insider-number").addClass("is-invalid");
    
            fieldIndex = fields.findIndex(f => f === "insiderNumber");
    
            fields.splice(fieldIndex, 1);
          break;

          case "postalCode":
            $("validation-address-postal-code").removeClass("is-Valid");
            $("validation-address-postal-code").addClass("is-invalid");
    
            fieldIndex = fields.findIndex(f => f === "postalCode");
    
            fields.splice(fieldIndex, 1);
          break;

          case "city":
            $("validation-address-city").removeClass("is-Valid");
            $("validation-address-city").addClass("is-invalid");
    
            fieldIndex = fields.findIndex(f => f === "city");
    
            fields.splice(fieldIndex, 1);
          break;

          default:
            break;
        }
    });

    showCorrectFields(fields);
  }
}

function addAddress(userID) {
  let toast;
  let validationResult = true;
  let validationFieldsResults = [];

  validationFieldsResults.push(validateStreetName());
  validationFieldsResults.push(validateColony());
  validationFieldsResults.push(validateOutSiderNumber());
  validationFieldsResults.push(validateInsiderNumber());
  validationFieldsResults.push(validatePostalCode());
  validationFieldsResults.push(validateCity());

  let result = validationFieldsResults.includes(false);

  if (result) {
    validationResult = false;
  }

  if (validationResult) {
    let streetName = $("#validation-address-street-name").val();
    let colony = $("#validation-address-colony").val();
    let outSiderNumber = $("#validation-address-out-sider-number").val();
    let insiderNumber = $("#validation-address-insider-number").val();
    let postalCode = $("#validation-address-postal-code").val();
    let city = $("#validation-address-city").val();

    let address = {
      "city": city,
      "colony": colony,
      "insideNumber": insiderNumber,
      "outSideNumber": outSiderNumber,
      "postalCode": postalCode,
      "streetName": streetName,
      "idCustomer": parseInt(userID)
    }

    console.table(address);

    $.ajax({
      method: "POST",
      url: urlServer + "/RegisterCustomerAddress",
      contentType: "application/json",
      data: JSON.stringify(address)
    }).done(function (data) {
      if (data.correct) {
        let fields = ["streetName", "colony", "outSiderNumber", "insiderNumber", "postalCode", "city"];
        
        showCorrectFields(fields);
        cleanFields("fullname"); 
        cleanFields("phone"); 
        cleanFields("email"); 
        cleanFields("password"); 
        cleanFields("repassword"); 
        $("#modal-add-address").hide();
        
        let messageSucess = [];

        messageSucess.push("Dirección Registrada Correctamente");
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
    titleModal.innerHTML = "Dirección no seleccionada";
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

function showSelectedAddress(element) {
  let dataID = $(`#${element.id}`).attr("data-id");
  let information = dataID.split('/')

  addressIDSelected = information[0];
  let addressFullName = information[1];

  const containerAddress =  document.getElementById("container-address");
  containerAddress.innerHTML = `<div class="address-selected mb-3 p-4" id="address-selected">${addressFullName}</div>`;
}


function registerOrder(orderNumber) {
  let actualDate = (new Date()).toLocaleString("en-US");
  let date = new Date();
  date.setDate(date.getDate() + 15); 
  let deliveryDate = (date).toLocaleString("en-US");

  let order = {
    "date": actualDate,
    "deliveryDate": deliveryDate,
    "orderNumber": orderNumber,
    "status": 'In Process',
    "totalToPay": totalBalanceInteger,
    "idUser": customerID,
    "idAddress": addressIDSelected,
    "idShoppingCart": shoppingCartID,
  };

  // console.table(order);

  $.ajax({
    method: "POST",
    url: urlServer + "/PostCustomerOrder",
    contentType: "application/json",
    data: JSON.stringify(order)
  }).done(function(data) {
    if (data.correct) {
      let messageSucess = [];

      messageSucess.push("Pedido Registrado Correctamente");
      showSuccessAlert(messageSucess, true);  
      setTimeout(showIndex, 1500);
    } 
  }).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus, true);
  });
}

paypal.Buttons({
  style: {
    color: 'blue',
    shape: 'pill',
    label:  'pay'
  },
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: totalBalanceInteger
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    actions.order.capture().then(function(details) {      
      if (addressIDSelected === undefined) {
        let messageSucess = [];

        messageSucess.push("Selecciona un dirección de envío");
        showSuccessAlert(messageSucess, false);  
      } else if (details.status === "COMPLETED") {
        registerOrder(details.id);   
      }
    });
  }
}).render('#paypal-button-container');

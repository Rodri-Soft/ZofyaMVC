const urlServer = "https://localhost:7004";

const sucessTost = document.getElementById('sucessToast')
const errorToast = document.getElementById('errorToast')

function reloadPage() {
  window.location.reload();
}

function deleteItemShoppingCart(element) {
  let toast;
  let idItemShoppingCart = parseInt($(element).attr("data-id"));

  $.ajax({
    method: "DELETE",
    url: urlServer + "/DeleteItemShoppingCart/" + idItemShoppingCart,
    contentType: false,
    data: null
  }).done(function(data) {
    if (data.correct) {
      toast = new bootstrap.Toast(sucessToast);   
      toast.show();      
      setTimeout(reloadPage, 1000);
    }
  }).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus, true);
  });
}

function changeItemQuantity(element, isIncrease) {
  let toast;
  let idItemShoppingCart = parseInt($(element).attr("data-id"));

  $.ajax({
    method: "PATCH",
    url: urlServer + "/ChangeItemQuantityById/" + idItemShoppingCart + "/" + isIncrease,
    contentType: false,
    data: null
  }).done(function(data) {
    if (data.correct) {
      toast = new bootstrap.Toast(sucessToast);   
      toast.show();      
      setTimeout(reloadPage, 1000);
    }
  }).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus, true);
  });
}


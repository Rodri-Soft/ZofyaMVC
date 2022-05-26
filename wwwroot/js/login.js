var urlServer = "https://localhost:7004";

$("#register-link").click(function (event) {
    $("#pills-register").addClass("show");
    $("#pills-register").addClass("active");

    $("#pills-login").removeClass("show");
    $("#pills-login").removeClass("active");

    $("#tab-register").addClass("active");
    $("#tab-register").attr("aria-selected", "true");

    $("#tab-login").removeClass("active");
    $("#tab-login").attr("aria-selected", "false");
});


function signIn() {

    $(document).ready(function () {

        var logInEmail = $("#validationCustom-login-email").val();
        var logInPassword = $("#validationCustom-login-password").val();

        var customer = {

            "email": logInEmail,
            "password": logInPassword
        };

        $.ajax({

            method: "POST",
            url: urlServer + "/LogIn",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(customer)

        }).done(function (data) {

            if (data.correct) {

                var successMessages = data.message;
                showAlert(successMessages, false, false);

                $("#validationCustom-login-email").removeClass("active");
                $("#validationCustom-login-email").val("");

                $("#validationCustom-login-password").removeClass("active");
                $("#validationCustom-login-password").val("");




            } else {

                var errorMessages = data.message;
                showAlert(errorMessages, true, false);

            }

        }).fail(function (jqXHR, textStatus) {
            showRequestErrors(jqXHR, textStatus, false);
        });
    });
}

function addCustomer() {

    $(document).ready(function () {

        var registerFullname = $("#validationCustom-register-fullname").val();
        var registerPhone = $("#validationCustom-register-phone").val();
        var registerEmail = $("#validationCustom-register-email").val();
        var registerPassword = $("#validationCustom-register-password").val();
        var registerRePassword = $("#validationCustom-register-repassword").val();
        var registerAgree = $('#registerCheck').prop('checked');

        registerAgree = String(registerAgree);

        var customer = {

            "email": registerEmail,
            "fullname": registerFullname,
            "password": registerPassword,
            "rePassword": registerRePassword,
            "phone": registerPhone,
            "agree": registerAgree
        };

        $.ajax({

            method: "POST",
            url: urlServer + "/Registration",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(customer)

        }).done(function (data) {

            if (data.correct) {

                var successMessages = data.message;
                showAlert(successMessages, false, true);

                var fields = ["email", "fullname", "password", "rePassword", "phone", "agree"];
                showCorrectFields(fields);

                $("#validationCustom-register-fullname").val("");
                $("#validationCustom-register-fullname").removeClass("active");
                $("#validationCustom-register-fullname").removeClass("is-valid");

                $("#validationCustom-register-phone").val("");
                $("#validationCustom-register-phone").removeClass("active");
                $("#validationCustom-register-phone").removeClass("is-valid");

                $("#validationCustom-register-email").val("");
                $("#validationCustom-register-email").removeClass("active");
                $("#validationCustom-register-email").removeClass("is-valid");

                $("#validationCustom-register-password").val("");
                $("#validationCustom-register-password").removeClass("active");
                $("#validationCustom-register-password").removeClass("is-valid");

                $("#validationCustom-register-repassword").val("");
                $("#validationCustom-register-repassword").removeClass("active");
                $("#validationCustom-register-repassword").removeClass("is-valid");

                var message = "The account has been successfully registered";
                // showModalSuccessMessage();
                $('#modalCorrectMessage').modal('show');


            } else {

                var errorMessages = data.message;
                var errorFields = data.field;

                showAlert(errorMessages, true, true);
                showMistakesField(errorFields);

            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus, true);

        });


    });

}

async function showAlert(errorMessages, isErrorAlert, isRegistration) {

    var form;    

    if(isRegistration){
        $('html,body').scrollTop(300);
        form = $("#form-register");
    }else{
        form = $("#form-login");
    }
    
    var alerts = [];

    if(isErrorAlert){

        if(isRegistration){
            document.getElementById("button-addCustomer").setAttribute("disabled", "");        
        }else{
            document.getElementById("button-logIn").setAttribute("disabled", "");        
        }                
    }

    errorMessages.forEach(message => {
                
        const alert = document.createElement('DIV');
        alert.textContent = message;
        alert.classList.add('alert');
        if(isErrorAlert){  
                    
            alert.classList.add('alert-danger');
        }else{
            alert.classList.add('alert-success');
        }
        
        form.append(alert);

        alerts.push(alert);

    });

    try {             

        const result = await Promise.all([removeAlerts(alerts), enableRegisterButton(isErrorAlert, isRegistration)]);        

    } catch (e) {
        console.error(e);
    }    

}

function removeAlerts(alerts) {

    setTimeout(() => {

        alerts.forEach(alert => {
            alert.remove();
        });                       

    }, 2500);  
}

function enableRegisterButton(isErrorAlert, isRegistration) {
    if(isErrorAlert){
        setTimeout(() => {

            if(isRegistration){
                document.getElementById("button-addCustomer").removeAttribute("disabled");                            
            }else{
                document.getElementById("button-logIn").removeAttribute("disabled");                            
            }
                
        }, 2500);  
    }
}

function showMistakesField(errorFields) {        
    
    var fields = ["email", "fullname", "password", "rePassword", "phone", "agree"];
    if (errorFields != null) {
        //Show fields with errors    
        errorFields.forEach(field => {

            switch (field) {

                case 'email':

                    $("#validationCustom-register-email").removeClass("is-valid");
                    $("#validationCustom-register-email").addClass("is-invalid");

                    var fieldIndex = fields.findIndex(f => f === 'email');
                    fields.splice(fieldIndex, 1);

                    break;

                case 'rePassword':

                    $("#validationCustom-register-repassword").removeClass("is-valid");
                    $("#validationCustom-register-repassword").addClass("is-invalid");

                    var fieldIndex = fields.findIndex(f => f === 'rePassword');
                    fields.splice(fieldIndex, 1);

                    break;

                case 'agree':

                    $("#registerCheck").removeClass("is-valid");
                    $("#registerCheck").addClass("is-invalid");

                    var fieldIndex = fields.findIndex(f => f === 'agree');
                    fields.splice(fieldIndex, 1);

                    break;

                default:
                    break;
            }
        });


        showCorrectFields(fields);
    }


}

function showCorrectFields(fields) {

    // Show fields without errors
    fields.forEach(field => {

        switch (field) {

            case 'email':
                $("#validationCustom-register-email").removeClass("is-invalid");                                            
                $("#validationCustom-register-email").addClass("is-valid");                

                break;  

            case 'rePassword': 
                $("#validationCustom-register-repassword").removeClass("is-invalid");
                $("#validationCustom-register-repassword").addClass("is-valid");               

                break;
            
            case 'fullname':
                $("#validationCustom-register-fullname").removeClass("is-invalid");
                $("#validationCustom-register-fullname").addClass("is-valid");               

                break;

            case 'password':
                $("#validationCustom-register-password").removeClass("is-invalid");
                $("#validationCustom-register-password").addClass("is-valid");     
                
                break;

            case 'phone':
                $("#validationCustom-register-phone").removeClass("is-invalid");
                $("#validationCustom-register-phone").addClass("is-valid");     
                
                break;

            case 'agree':
                $("#registerCheck").removeClass("is-invalid");
                $("#registerCheck").addClass("is-valid");
                break;

            default:               
                break;
        }      
    });
}

function showRequestErrors(jqXHR, textStatus, isRegistration) {

    var errorMessages = [];

    if (jqXHR.status === 0) {
        
        var message = 'Not connect: Verify Network.';        
        errorMessages.push(message);

        if(isRegistration){
            showAlert(errorMessages, true, true);
        }else{
            showAlert(errorMessages, true, false);
        }        

    } else if (jqXHR.status == 404) {
        
        var message = 'Requested page not found [404]';        
        errorMessages.push(message);
        
        if(isRegistration){
            showAlert(errorMessages, true, true);
        }else{
            showAlert(errorMessages, true, false);
        }

    } else if (jqXHR.status == 500) {
        
        var message = 'Internal Server Error [500].';        
        errorMessages.push(message);
        
        if(isRegistration){
            showAlert(errorMessages, true, true);
        }else{
            showAlert(errorMessages, true, false);
        }

    } else if (textStatus === 'parsererror') {
        
        var message = 'Requested JSON parse failed.';        
        errorMessages.push(message);
        
        if(isRegistration){
            showAlert(errorMessages, true, true);
        }else{
            showAlert(errorMessages, true, false);
        }

    } else if (textStatus === 'timeout') {
        
        var message = 'Time out error.';        
        errorMessages.push(message);
        
        if(isRegistration){
            showAlert(errorMessages, true, true);
        }else{
            showAlert(errorMessages, true, false);
        }

    } else if (textStatus === 'abort') {
        
        var message = 'Ajax request aborted.';        
        errorMessages.push(message);
        
        if(isRegistration){
            showAlert(errorMessages, true, true);
        }else{
            showAlert(errorMessages, true, false);
        }

    } else {
        
        var message = 'Uncaught Error: ' + jqXHR.responseText;
        console.error(message);

    }
}


function reloadView(){
    location.reload();    
}




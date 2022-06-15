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

const fullnameRequiredMessage = "Full Name Field Required";
const phoneRequiredMessage = "Phone Field Required";
const emailRequiredMessage = "Email Field Required";
const passwordRequiredMessage = "Password Field Required";

const fullnameLenghtMessage = "Maximum length of 100 characters";
const phoneLenghtMessage = "Must be a 10 digit phone number";
const emailLenghtMessage = "Maximum length of 50 characters";
const passwordMinLenghtMessage = "Minimum length of 8 characters";
const passwordMaxLenghtMessage = "Maximum length of 16 characters";


function validateFullName() {

    var registerFullname = $("#validationCustom-register-fullname").val();

    const fullnameMaxLength = 100;
    var isCorrect = true;

    var fullnameLength = registerFullname.length;

    var pattern =  new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);
    if(!pattern.test(registerFullname)){
        
        isCorrect = false;
        var field = document.getElementById("invalidFullname");
        field.innerHTML = "Invalid Full Name Format.";
    }

    if ((registerFullname === "") || (fullnameLength > fullnameMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidFullname");

        if (registerFullname === "") {
            field.innerHTML = fullnameRequiredMessage;
        } else {
            field.innerHTML = fullnameLenghtMessage;
        }
    }
            
    if (!isCorrect) {
        changeInValidField("fullname")
    } else {
        changeValidField("fullname")
    }

    return isCorrect;
}

function validatePhone() {

    var registerPhone = $("#validationCustom-register-phone").val();

    const phoneMaxLength = 10;
    var isCorrect = true;

    var phoneLength = registerPhone.length;

    var pattern =  new RegExp(/^[0-9]{10}$/);
    if(!pattern.test(registerPhone)){
        
        isCorrect = false;
        var field = document.getElementById("invalidPhone");
        field.innerHTML = "Invalid Phone Format.";
    }

    if ((registerPhone === "") || (phoneLength != phoneMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidPhone");

        if (registerPhone === "") {
            field.innerHTML = phoneRequiredMessage;
        } else {
            field.innerHTML = phoneLenghtMessage;
        }
    }

    if (!isCorrect) {
        changeInValidField("phone")
    } else {
        changeValidField("phone")
    }

    return isCorrect;
}

function validateEmail() {

    var registerEmail = $("#validationCustom-register-email").val();

    const emailMaxLength = 50;
    var isCorrect = true;

    var emailLength = registerEmail.length;

    var pattern =  new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.[A-Za-z]{1,})$/);
    if(!pattern.test(registerEmail)){
        
        isCorrect = false;
        var field = document.getElementById("invalidEmail");
        field.innerHTML = "Invalid Email Format.";
    }

    if ((registerEmail === "") || (emailLength > emailMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidEmail");

        if (registerEmail === "") {
            field.innerHTML = emailRequiredMessage;
        } else {
            field.innerHTML = emailLenghtMessage;
        }
    }

    if (!isCorrect) {
        changeInValidField("email")
    } else {
        changeValidField("email")
    }

    return isCorrect;
}

function validatePassword() {

    var registerPassword = $("#validationCustom-register-password").val();

    const passwordMinLenght = 8;
    const passwordMaxLength = 16;

    var isCorrect = true;

    var passwordLenght = registerPassword.length;

    // var pattern =  new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/);
    var pattern =  new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-zÀ-ÿ\\u00f1\\u00d1\d$@$!%*?&#.$($)$-$_]{8,16}$/);
    
    if(!pattern.test(registerPassword)){
        
        isCorrect = false;
        var field = document.getElementById("invalidPassword");
        field.innerHTML = "Invalid Password Format.";
    }

    if ((registerPassword === "") ||
        ((passwordLenght < passwordMinLenght) || (passwordLenght > passwordMaxLength))) {

        isCorrect = false;
        var field = document.getElementById("invalidPassword");

        if (registerPassword === "") {
            field.innerHTML = passwordRequiredMessage;
        } else {
            if (passwordLenght < passwordMinLenght) {
                field.innerHTML = passwordMinLenghtMessage;
            } else {
                field.innerHTML = passwordMaxLenghtMessage;
            }
        }
    }

    if (!isCorrect) {
        changeInValidField("password")
    } else {
        changeValidField("password")
    }

    return isCorrect;
}

function validateRePassword() {

    var registerRePassword = $("#validationCustom-register-repassword").val();    

    var isCorrect = true;    

    if (registerRePassword === "") {

        isCorrect = false;
        var field = document.getElementById("invalidRePassword");        
        field.innerHTML = "Repeat password Field Required";        
    }

    if (!isCorrect) {
        changeInValidField("repassword")
    } else {
        changeValidField("repassword")
    }

    return isCorrect;
}

function changeValidField(field) {

    $("#validationCustom-register-" + field).removeClass("is-invalid");
    $("#validationCustom-register-" + field).addClass("is-valid");

}

function changeInValidField(field) {

    $("#validationCustom-register-" + field).removeClass("is-valid");
    $("#validationCustom-register-" + field).addClass("is-invalid");

}

$(document).ready(function () {

    //Full Name
    $("#validationCustom-register-fullname").keydown(function (event) {
        validateFullName();
    });
    $("#validationCustom-register-fullname").keyup(function (event) {
        validateFullName();
    });
    $("#validationCustom-register-fullname").blur(function (event) {
        validateFullName();
    });

    //Phone
    $("#validationCustom-register-phone").keydown(function (event) {
        validatePhone();
    });
    $("#validationCustom-register-phone").keyup(function (event) {
        validatePhone();
    });
    $("#validationCustom-register-phone").blur(function (event) {
        validatePhone();
    });

    //Email
    $("#validationCustom-register-email").keydown(function (event) {
        validateEmail();
    });
    $("#validationCustom-register-email").keyup(function (event) {
        validateEmail();
    });
    $("#validationCustom-register-email").blur(function (event) {
        validateEmail();
    });

    //Password    
    $("#validationCustom-register-password").keydown(function (event) {
        validatePassword();
    });
    $("#validationCustom-register-password").keyup(function (event) {
        validatePassword();
    });
    $("#validationCustom-register-password").blur(function (event) {
        validatePassword();
    });

    //RePassword    
    $("#validationCustom-register-repassword").keydown(function (event) {
        validateRePassword();
    });
    $("#validationCustom-register-repassword").keyup(function (event) {
        validateRePassword();
    });
    $("#validationCustom-register-repassword").blur(function (event) {
        validateRePassword();
    });

    var errorAlertElement = document.getElementById("errorAlert");
    var errorMessage = errorAlertElement.textContent;
    if(errorMessage != ""){
        
        $("#errorAlert").addClass("alert");
        $("#errorAlert").addClass("alert-danger");
        errorAlertElement.style.fontWeight = 400;
    }

});


// function signIn() {

//     $(document).ready(function () {

//         var logInEmail = $("#validationCustom-login-email").val();
//         var logInPassword = $("#validationCustom-login-password").val();

//         var customer = {

//             "email": logInEmail,
//             "password": logInPassword
//         };

//         $.ajax({

//             method: "POST",
//             url: urlServer + "/LogIn",
//             cache: false,
//             processData: false,
//             contentType: "application/json",
//             data: JSON.stringify(customer)

//         }).done(function (data) {

//             if (data.correct) {

//                 var successMessages = data.message;
//                 showAlert(successMessages, false, false);

//                 $("#validationCustom-login-email").removeClass("active");
//                 $("#validationCustom-login-email").val("");

//                 $("#validationCustom-login-password").removeClass("active");
//                 $("#validationCustom-login-password").val("");




//             } else {

//                 var errorMessages = data.message;
//                 showAlert(errorMessages, true, false);

//             }

//         }).fail(function (jqXHR, textStatus) {
//             showRequestErrors(jqXHR, textStatus, false);
//         });
//     });
// }

function addCustomer() {

    $(document).ready(function () {
                
        disableRegisterButton();
        var validationResult = true;

        var validationFieldsResults = []
        validationFieldsResults.push(validateFullName());
        validationFieldsResults.push(validatePhone());
        validationFieldsResults.push(validateEmail());
        validationFieldsResults.push(validatePassword());
        validationFieldsResults.push(validateRePassword());

        var registerAgreeResult = checkedTerms();
        validationFieldsResults.push(registerAgreeResult);

        var result = validationFieldsResults.includes(false);

        if (result) {
            validationResult = false;
        }

        if (validationResult) {

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
                    
                    var fields = ["email", "fullname", "password", "rePassword", "phone", "agree"];
                    showCorrectFields(fields);
                    
                    cleanFields("fullname"); 
                    cleanFields("phone"); 
                    cleanFields("email"); 
                    cleanFields("password"); 
                    cleanFields("repassword"); 
                    enableRegisterButton();
                    
                    $('#modalCorrectMessage').modal('show');


                } else {

                    var errorMessages = data.message;
                    var errorFields = data.field;
                                        
                    emptyInvalidFields();
                    showAlert(errorMessages, true, true);
                    showMistakesField(errorFields);
                    enableRegisterButton();
                }

            }).fail(function (jqXHR, textStatus) {

                showRequestErrors(jqXHR, textStatus, true);
                enableRegisterButton();
                
            });
        } else if (!registerAgreeResult) {

            showAlert(["It is necessary to accept the terms and conditions"], true, true);
            enableRegisterButton();
        }else{
            enableRegisterButton();
        }
    });
}

function disableRegisterButton() {
    document.getElementById("button-addCustomer").setAttribute("disabled", "");  
    document.getElementById("registerCheck").setAttribute("disabled", "");  
    $('#termsLink').attr({
        'data-mdb-target': ''        
    });
    document.getElementById("termsLink").removeAttribute("data-mdb-toggle");  
    document.getElementById("termsLink").removeAttribute("href");  

}

function enableRegisterButton() {
    document.getElementById("button-addCustomer").removeAttribute("disabled");  
    document.getElementById("registerCheck").removeAttribute("disabled");  
    $('#termsLink').attr({
        'data-mdb-target': '#modalTerms'        
    });
    document.getElementById("termsLink").setAttribute("data-mdb-toggle", "modal");  
    document.getElementById("termsLink").setAttribute("href", "#");  
}

function cleanFields(field) {
    
    $("#validationCustom-register-" + field).val("");
    $("#validationCustom-register-" + field).removeClass("active");
    $("#validationCustom-register-" + field).removeClass("is-valid");
}

function emptyInvalidFields() {

    var fullnameField = document.getElementById("invalidFullname");
    var phoneField = document.getElementById("invalidPhone");
    var emailField = document.getElementById("invalidEmail");
    var passwordField = document.getElementById("invalidPassword");
    var rePasswordField = document.getElementById("invalidRePassword");

    fullnameField.innerHTML = "";
    phoneField.innerHTML = "";
    emailField.innerHTML = "";
    passwordField.innerHTML = "";
    rePasswordField.innerHTML = "";

}

async function showAlert(errorMessages, isErrorAlert, isRegistration) {    

    var form;

    if (isRegistration) {       
        form = $("#form-register");
    } else {
        form = $("#form-login");
    }
    

    $("#modalErrors").find(".modal-body").empty();
    errorMessages.forEach(message => {

        if (message === "Invalid Password Format.") {
            message = "Invalid password format. The password must have between 8 and 16 characters, at least one digit, at least 1 special character, at least one lower case, at least one upper case and no whitespace"
        }

        const alert = document.createElement('DIV');
        alert.textContent = message;
        alert.classList.add('alert');        
        if (isErrorAlert) {
            alert.classList.add('alert-danger');
        } else {
            alert.classList.add('alert-success');
        }
        
        $("#modalErrors").find(".modal-body").append(alert);          

    });
    
    $('#modalErrors').modal('show');    
}

function hideModalErrors() {
    $('#modalErrors').modal('hide');
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

                case 'fullname':

                    $("#validationCustom-register-fullname").removeClass("is-valid");
                    $("#validationCustom-register-fullname").addClass("is-invalid");

                    var fieldIndex = fields.findIndex(f => f === 'fullname');
                    fields.splice(fieldIndex, 1);

                    break;

                case 'password':

                    $("#validationCustom-register-password").removeClass("is-valid");
                    $("#validationCustom-register-password").addClass("is-invalid");

                    var fieldIndex = fields.findIndex(f => f === 'password');
                    fields.splice(fieldIndex, 1);

                    break;

                case 'phone':

                    $("#validationCustom-register-phone").removeClass("is-valid");
                    $("#validationCustom-register-phone").addClass("is-invalid");

                    var fieldIndex = fields.findIndex(f => f === 'phone');
                    fields.splice(fieldIndex, 1);

                    break;

                default:
                    break;
            }
        });


        showCorrectFields(fields);
    }

}

function checkedTerms() {

    var registerAgree = $('#registerCheck').prop('checked');

    if (registerAgree) {
        $("#registerCheck").removeClass("is-invalid");
        $("#registerCheck").addClass("is-valid");
    } else {
        $("#registerCheck").removeClass("is-valid");
        $("#registerCheck").addClass("is-invalid");
    }

    return registerAgree;
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

        if (isRegistration) {
            showAlert(errorMessages, true, true);
        } else {
            showAlert(errorMessages, true, false);
        }

    } else if (jqXHR.status == 404) {

        var message = 'Requested page not found [404]';
        errorMessages.push(message);

        if (isRegistration) {
            showAlert(errorMessages, true, true);
        } else {
            showAlert(errorMessages, true, false);
        }

    } else if (jqXHR.status == 500) {

        var message = 'Internal Server Error [500].';
        errorMessages.push(message);

        if (isRegistration) {
            showAlert(errorMessages, true, true);
        } else {
            showAlert(errorMessages, true, false);
        }

    } else if (jqXHR.status == 400) {

        var message = 'Check wrong fields';
        errorMessages.push(message);

        if (isRegistration) {
            showAlert(errorMessages, true, true);
        } else {
            showAlert(errorMessages, true, false);
        }        

    } else if (textStatus === 'parsererror') {

        var message = 'Requested JSON parse failed.';
        errorMessages.push(message);

        if (isRegistration) {
            showAlert(errorMessages, true, true);
        } else {
            showAlert(errorMessages, true, false);
        }

    } else if (textStatus === 'timeout') {

        var message = 'Time out error.';
        errorMessages.push(message);

        if (isRegistration) {
            showAlert(errorMessages, true, true);
        } else {
            showAlert(errorMessages, true, false);
        }

    } else if (textStatus === 'abort') {

        var message = 'Ajax request aborted.';
        errorMessages.push(message);

        if (isRegistration) {
            showAlert(errorMessages, true, true);
        } else {
            showAlert(errorMessages, true, false);
        }

    } else {

        var message = 'Uncaught Error: ' + jqXHR.responseText;
        console.error(message);

    }
}

function reloadView() {
    location.reload();
}




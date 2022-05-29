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

const fullnameLenghtMessage= "Maximum length of 100 characters";
const phoneLenghtMessage= "Must be a 10 digit phone number";
const emailLenghtMessage= "Maximum length of 50 characters";
const passwordMinLenghtMessage= "Minimum length of 8 characters";
const passwordMaxLenghtMessage= "Maximum length of 16 characters";


function validateFullName() {

    var registerFullname = $("#validationCustom-register-fullname").val();

    const fullnameMaxLength = 100;   
    var isCorrect = true;

    var fullnameLength = registerFullname.length;

    if ((registerFullname === "") || (fullnameLength > fullnameMaxLength)) {

        isCorrect = false;        
        var field = document.getElementById("invalidFullname");

        if(registerFullname === ""){
            field.innerHTML = fullnameRequiredMessage;                    
        }else{
            field.innerHTML = fullnameLenghtMessage;                         
        }                
    }
    
    if(!isCorrect){                       
        changeInValidField("fullname")
    }else{        
        changeValidField("fullname")
    }        
    
    return isCorrect;
}

function validatePhone() {

    var registerPhone = $("#validationCustom-register-phone").val();

    const phoneMaxLength = 10;  
    var isCorrect = true;

    var phoneLength = registerPhone.length;

    if ((registerPhone === "") || (phoneLength != phoneMaxLength)) {

        isCorrect = false;        
        var field = document.getElementById("invalidPhone");

        if(registerPhone === ""){
            field.innerHTML = phoneRequiredMessage;                     
        }else{
            field.innerHTML = phoneLenghtMessage;                                
        }                
    }
    
    if(!isCorrect){                       
        changeInValidField("phone")
    }else{        
        changeValidField("phone")
    }        
    
    return isCorrect;
}

function validateEmail(registrationButtonClicked) {

    var registerEmail = $("#validationCustom-register-email").val();

    const emailMaxLength = 50;       
    var isCorrect = true;

    var emailLength = registerEmail.length;

    if ((registerEmail === "") || (emailLength > emailMaxLength)) {

        isCorrect = false;        
        var field = document.getElementById("invalidEmail");

        if(registerEmail === ""){
            field.innerHTML = emailRequiredMessage;                       
        }else{
            field.innerHTML = emailLenghtMessage;                                  
        }                
    }
    
    if(!isCorrect){                       
        changeInValidField("email")
    }else{        
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

    if((registerPassword === "") || 
       ((passwordLenght < passwordMinLenght) || (passwordLenght > passwordMaxLength))){

        isCorrect = false;        
        var field = document.getElementById("invalidPassword");

        if(registerPassword === ""){
            field.innerHTML = passwordRequiredMessage;                       
        }else{
            if(passwordLenght < passwordMinLenght){
                field.innerHTML = passwordMinLenghtMessage;                    
            }else{
                field.innerHTML = passwordMaxLenghtMessage;                   
            }                    
        }                
    }
    
    if(!isCorrect){                       
        changeInValidField("password")
    }else{        
        changeValidField("password")
    }        
    
    return isCorrect;
}

function changeValidField(field) {

    $("#validationCustom-register-"+field).removeClass("is-invalid");
    $("#validationCustom-register-"+field).addClass("is-valid");
   
}

function changeInValidField(field) {

    $("#validationCustom-register-"+field).removeClass("is-valid");
    $("#validationCustom-register-"+field).addClass("is-invalid"); 

}

$(document).ready(function(){

    //Full Name
	$("#validationCustom-register-fullname").keydown(function(event){
		validateFullName(false);
	}); 
    $("#validationCustom-register-fullname").keyup(function(event){
		validateFullName(false);
	}); 
    $("#validationCustom-register-fullname").blur(function(event){
		validateFullName(false);
	}); 

    //Phone
    $("#validationCustom-register-phone").keydown(function(event){
		validatePhone(false);
	}); 
    $("#validationCustom-register-phone").keyup(function(event){
		validatePhone(false);
	}); 
    $("#validationCustom-register-phone").blur(function(event){
		validatePhone(false);
	}); 

    //Email
    $("#validationCustom-register-email").keydown(function(event){
		validateEmail(false);
	}); 
    $("#validationCustom-register-email").keyup(function(event){
		validateEmail(false);
	}); 
    $("#validationCustom-register-email").blur(function(event){
		validateEmail(false);
	}); 

    //Password    
    $("#validationCustom-register-password").keydown(function(event){
		validatePassword(false);
	}); 
    $("#validationCustom-register-password").keyup(function(event){
		validatePassword(false);
	}); 
    $("#validationCustom-register-password").blur(function(event){
		validatePassword(false);
	}); 
    
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

function validateRegistrationFields() {

    var registerFullname = $("#validationCustom-register-fullname").val();
    var registerPhone = $("#validationCustom-register-phone").val();
    var registerEmail = $("#validationCustom-register-email").val();
    var registerPassword = $("#validationCustom-register-password").val();    

    const fullnameMaxLength = 100;
    const phoneMaxLength = 10;
    const emailMaxLength = 50;    
    
    const passwordMinLenght = 8;
    const passwordMaxLength = 16;

    var fields = [];
    var messages = [];
    var isCorrect = true;      

    var fullnameLength = registerFullname.length;
    var phoneLenght = registerPhone.length;
    var emailLenght = registerEmail.length;
    var passwordLenght = registerPassword.length;

    if( (registerFullname === "") || (fullnameLength > fullnameMaxLength) ){

        isCorrect = false;
        fields.push("fullname"); 

        if(registerFullname === ""){
            messages.push("Full Name Field Required");    
        }else{
            messages.push("Maximum length of 100 characters");
        }                 
    }

    if( (registerPhone === "") || (phoneLenght > phoneMaxLength) ){

        isCorrect = false;
        fields.push("phone"); 

        if(registerPhone === ""){
            messages.push("Phone Field Required");    
        }else{
            messages.push("Maximum length of 10 characters");
        }                 
    }

    if( (registerEmail === "") || (emailLenght > emailMaxLength) ){

        isCorrect = false;
        fields.push("email"); 

        if(registerEmail === ""){
            messages.push("Email Field Required");    
        }else{
            messages.push("Maximum length of 50 characters");
        }                 
    }

    if((registerPassword === "") || 
       ((passwordLenght < passwordMinLenght) || (passwordLenght > passwordMaxLength))){

        isCorrect = false;
        fields.push("password"); 
        fields.push("rePassword"); 

        if(registerPassword === ""){
            messages.push("Password Field Required");    
        }else{
            if(passwordLenght < passwordMinLenght){
                messages.push("Minimum length of 8 characters");
            }else{
                messages.push("Maximum length of 16 characters");
            }
            
        }                 
    }

    if(!isCorrect){
        showAlert(messages, true, true);
        showMistakesField(fields);
    }
    
    return isCorrect;


    // const alphabeticCharactersRegularPhrase = "^[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$";
    // const emailRegularPhrase = "\A(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z";
    // const phoneRegularPhrase = "^[0-9]{10}$";
    // const passwordRegularPhrase = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\da-zA-ZÀ-ÿ\\u00f1\\u00d1$@$!%*?&#-.$($)$-$_]{8,16}$";

    // const passwordErrorMessageSpanish = "Formato de contraseña inválido. La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y sin espacios en blanco";
    // const passwordErrorMessage = "Invalid password format. The password must have between 8 and 16 characters, at least one digit, at least one lower case, at least one upper case and no whitespace";

}

function addCustomer() {

    $(document).ready(function () {
                
        var validationResult = true;

        var validationFieldsResults = []        
        validationFieldsResults.push(validateFullName(false));
        validationFieldsResults.push(validatePhone(false));
        validationFieldsResults.push(validateEmail(false));
        validationFieldsResults.push(validatePassword(false));

        var registerAgreeResult = checkedTerms();
        validationFieldsResults.push(registerAgreeResult);

        var result = validationFieldsResults.includes(false);        

        if(result){
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
                url: urlServer + "/RegistrationTest",
                cache: false,
                processData: false,
                contentType: "application/json",
                data: JSON.stringify(customer)

            }).done(function (data) {

                // console.log(data);

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

                    // var message = "The account has been successfully registered";
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
        }else if(!registerAgreeResult){

            showAlert(["It is necessary to accept the terms and conditions"], true, true);
        }
    });
}

async function showAlert(errorMessages, isErrorAlert, isRegistration) {

    var form;    

    if(isRegistration){

        const numberOfErrors = errorMessages.length

        if(numberOfErrors <= 2){
            $('html,body').scrollTop(300);
        }else if(numberOfErrors == 3){
            $('html,body').scrollTop(400);
        }else {
            $('html,body').scrollTop(500);
        }

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

    }, 3000);  
}

function enableRegisterButton(isErrorAlert, isRegistration) {
    if(isErrorAlert){
        setTimeout(() => {

            if(isRegistration){
                document.getElementById("button-addCustomer").removeAttribute("disabled");                            
            }else{
                document.getElementById("button-logIn").removeAttribute("disabled");                            
            }
                
        }, 3000);  
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

    if(registerAgree){
        $("#registerCheck").removeClass("is-invalid");
        $("#registerCheck").addClass("is-valid");
    }else{
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

    }  else if (jqXHR.status == 400) {
        
        var message = 'Check wrong fields';        
        errorMessages.push(message);
        
        if(isRegistration){
            showAlert(errorMessages, true, true);
        }else{
            showAlert(errorMessages, true, false);
        }
        
        var errors = jqXHR.errors;

        console.log(jqXHR.responseJSON.errors);
        // errors.forEach(element => {
        //     console.log(element);
        // });
        
    
    }else if (textStatus === 'parsererror') {
        
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




var urlServer = "https://localhost:7004";

function setCustomerInformation(userEmail) {
            
    $('#pageContent').empty();

    $("#pageContent").html(`

        <div class="text-center mb-3">
            <h3 class="brand-zofya brand-zofya-logo">My Profile</h3>
        </div>
        
        <table id="customersTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Personal information</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Email</th>
                    <td id="emailRow"></td>
                </tr>
                <tr>
                    <th scope="row">Full Name</th>
                    <td id="fullnameRow"></td>
                </tr>                
                <tr>
                    <th scope="row">Password</th>
                    <td>********</td>
                </tr>
                <tr>
                    <th scope="row">Phone</th>
                    <td id="phoneRow"></td>
                </tr>
            </tbody>
        </table>
    `);

    customerTable = $('#customersTable').DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        columns : [            
            {"data": "field"},
            {"data": "value"}
        ] 
    });

    loadData(userEmail);

    $("#customersTable tbody").on("click", "tr", function () {
    
        var informationRow = customerTable.row(this).data();                     
        
        switch (informationRow.field) {
            
            case 'Email':
                
                clearUpdateForm();
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Email";
                document.getElementById("updateNewLabel").innerHTML = "New Email:";
                $("#updateFormFooter").html(`

                    <button onclick="updateEmail();" type="button" class="btn button-action-style" 
                        id="updateButton">Save Email</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);

                validateField(validateEmail);
                break;

            case 'Full Name':
                
                clearUpdateForm();
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Fullname";
                document.getElementById("updateNewLabel").innerHTML = "Fullname:";
                $("#updateFormFooter").html(`

                    <button onclick="updateFullname();" type="button" class="btn button-action-style"
                        id="updateButton">Save Fullname</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);
                
                validateField(validateFullName);
                break;

            case 'Password':

                clearUpdatePasswordForm();
                $('#updateDialogPassword').modal('show');                

                $("#updateFormFooterPassword").html(`

                    <button onclick="updatePassword();" type="button" class="btn button-action-style" id="updatePasswordButton">Save Password</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideUpdateModalPassword();">Close</button>
                
                `);

                validatePasswordField(validatePassword);
                break;

            case 'Phone':
                
                clearUpdateForm();
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Phone";
                document.getElementById("updateNewLabel").innerHTML = "New Phone:";
                $("#updateFormFooter").html(`

                    <button onclick="updatePhone(); return false;" type="button" class="btn button-action-style"
                        id="updateButton">Save Phone</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);
                
                validateField(validatePhone);
                break;

            default:                
                break;
        } 
    });
}

var customerInformation;
function loadData(userEmail) {        

    var IDResult = {
        "id" : userEmail
    };   

    $.ajax({

        method: "POST",
        url: urlServer+"/PostFindCustomerEmail",
        cache: false,
        processData: false,
        contentType: "application/json",                    
        data: JSON.stringify(IDResult)

    }).done(function (data) {
        
        customerInformation = data;                       
        loadCustomerDataTable(customerInformation);
    });
} 

function loadCustomerDataTable(customerInformation) {      

    $("#emailRow").html(customerInformation.email);
    $("#fullnameRow").html(customerInformation.fullName);            
    $("#phoneRow").html(customerInformation.phone);

}

function validateField(validateFunction) {

    $("#updateInput").keydown(function (event) {
        validateFunction();
    });
    $("#updateInput").keyup(function (event) {
        validateFunction();
    });
    $("#updateInput").blur(function (event) {
        validateFunction();
    });
}

function validatePasswordField(validateFunction) {

    $("#updateInputNewPassword").keydown(function (event) {
        validateFunction();
    });
    $("#updateInputNewPassword").keyup(function (event) {
        validateFunction();
    });
    $("#updateInputNewPassword").blur(function (event) {
        validateFunction();
    });
}

function clearUpdateForm() {
    
    $("#updateInput").val("");
    $("#updateInput").removeClass("is-valid");
    $("#updateInput").removeClass("is-invalid");
}

function clearUpdatePasswordForm() {
    
    $("#updateInputCurrentPassword").val("");
    $("#updateInputNewPassword").val("");
    $("#updateInputNewPassword").removeClass("is-valid");
    $("#updateInputNewPassword").removeClass("is-invalid");
}

function hideUpdateModal() {
    $('#updateDialog').modal('hide');
    $("#updateInput").val("");
    $("#updateInput").removeClass("is-valid");
    $("#updateInput").removeClass("is-invalid");
}

function hideUpdateModalPassword() {
    $('#updateDialogPassword').modal('hide');
}

function validateEmail() {

    var newEmail = $("#updateInput").val();

    const emailMaxLength = 50;
    var isCorrect = true;

    var emailLength = newEmail.length;

    var pattern =  new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.[A-Za-z]{1,})$/);
    if(!pattern.test(newEmail)){
        
        isCorrect = false;
        var field = document.getElementById("invalidField");
        field.innerHTML = "Invalid Email Format";
    }

    if ((newEmail === "") || (emailLength > emailMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidField");

        if (newEmail === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 50 characters";
        }
    }

    if (!isCorrect) {
        changeInValidField();
    } else {
        changeValidField();
    }

    return isCorrect;
}

function validateFullName() {

    var newFullname = $("#updateInput").val();

    const fullnameMaxLength = 100;
    var isCorrect = true;

    var fullnameLength = newFullname.length;

    var pattern =  new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);
    if(!pattern.test(newFullname)){
        
        isCorrect = false;
        var field = document.getElementById("invalidField");
        field.innerHTML = "Invalid Full Name Format";
    }

    if ((newFullname === "") || (fullnameLength > fullnameMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidField");

        if (newFullname === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 100 characters";
        }
    }
            
    if (!isCorrect) {
        changeInValidField()
    } else {
        changeValidField()
    }

    return isCorrect;
}

function validatePhone() {

    var newPhone = $("#updateInput").val();

    const phoneMaxLength = 10;
    var isCorrect = true;

    var phoneLength = newPhone.length;

    var pattern =  new RegExp(/^[0-9]{10}$/);
    if(!pattern.test(newPhone)){
        
        isCorrect = false;
        var field = document.getElementById("invalidField");
        field.innerHTML = "Invalid Phone Format";
    }

    if ((newPhone === "") || (phoneLength != phoneMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidField");

        if (newPhone === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 10 characters";
        }
    }

    if (!isCorrect) {
        changeInValidField();
    } else {
        changeValidField();
    }

    return isCorrect;
}

function validatePassword() {

    var newPassword = $("#updateInputNewPassword").val();

    const passwordMinLenght = 8;
    const passwordMaxLength = 16;

    var isCorrect = true;

    var passwordLenght = newPassword.length;    

    if ((newPassword === "") ||
        ((passwordLenght < passwordMinLenght) || (passwordLenght > passwordMaxLength))) {

        isCorrect = false;
        var field = document.getElementById("invalidFieldNewPassword");

        if (newPassword === "") {
            field.innerHTML = "Password Field Required";
        } else {
            if (passwordLenght < passwordMinLenght) {
                field.innerHTML = "Minimum length of 8 characters";
            } else {
                field.innerHTML = "Maximum length of 16 characters";
            }
        }
    }

    if (!isCorrect) {
        
        $("#updateInputNewPassword").removeClass("is-valid");
        $("#updateInputNewPassword").addClass("is-invalid");

    } else {
        $("#updateInputNewPassword").removeClass("is-invalid");
        $("#updateInputNewPassword").addClass("is-valid");
    }

    return isCorrect;
}

function changeInValidField() {

    $("#updateInput").removeClass("is-valid");
    $("#updateInput").addClass("is-invalid");

}

function changeValidField() {

    $("#updateInput").removeClass("is-invalid");
    $("#updateInput").addClass("is-valid");

}

function updateEmail() {
    
    disableUpdateButton();
    var validationResult = true;   

    validationResult = validateEmail();

    if (validationResult) {        

        var updateEmailValue= $("#updateInput").val();

        var customerInformationUpdate = {
            "field": "email",
            "value": updateEmailValue,
            "primaryKeyEmail": customerInformation.email
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateCustomer",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(customerInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdateForm();
                enableUpdateButton();

                hideUpdateModal();
                showSuccessAccessAlert(data.message);                

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdateButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdateButton();

        });

    } else {
        enableUpdateButton();
    }
}

function updateFullname() {
    
    disableUpdateButton();
    var validationResult = true;   

    validationResult = validateFullName();

    if (validationResult) {        

        var updateFullnameValue= $("#updateInput").val();

        var customerInformationUpdate = {
            "field": "fullname",
            "value": updateFullnameValue,
            "primaryKeyEmail": customerInformation.email
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateCustomer",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(customerInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdateForm();
                enableUpdateButton();

                hideUpdateModal();
                showSuccessInformationAlert(data.message);                

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdateButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdateButton();

        });

    } else {
        enableUpdateButton();
    }

}

function updatePassword() {
    
    disableUpdatePasswordButton();
    var validationResult = true;   

    validationResult = validatePassword();

    if (validationResult) {        

        var updateCurrentPasswordValue= $("#updateInputCurrentPassword").val();
        var updateNewPasswordValue= $("#updateInputNewPassword").val();

        var customerInformationUpdate = {
            "currentValue": updateCurrentPasswordValue,
            "newValue": updateNewPasswordValue,
            "primaryKeyEmail": customerInformation.email
        }

        $.ajax({

            method: "PUT", 
            url: urlServer+"/UpdateCustomerPassword",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(customerInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdatePasswordForm();
                enableUpdatePasswordButton();

                hideUpdateModalPassword();
                showSuccessInformationAlert(data.message);                

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdatePasswordButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdatePasswordButton();

        });

    } else {
        enableUpdatePasswordButton();
    }

}

function updatePhone() {
    
    disableUpdateButton();
    var validationResult = true;   

    validationResult = validatePhone();

    if (validationResult) {        

        var updatePhoneValue= $("#updateInput").val();

        var customerInformationUpdate = {
            "field": "phone",
            "value": updatePhoneValue,
            "primaryKeyEmail": customerInformation.email
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateCustomer",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(customerInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdateForm();
                enableUpdateButton();

                hideUpdateModal();
                showSuccessInformationAlert(data.message);                  

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdateButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdateButton();

        });

    } else {
        enableUpdateButton();
    }

}

function disableUpdateButton() {
    document.getElementById("updateButton").setAttribute("disabled", "");           
}

function disableUpdatePasswordButton() {
    document.getElementById("updatePasswordButton").setAttribute("disabled", "");           
}

function enableUpdateButton() {
    document.getElementById("updateButton").removeAttribute("disabled");      
}

function enableUpdatePasswordButton() {
    document.getElementById("updatePasswordButton").removeAttribute("disabled");      
}

function showSuccessInformationAlert(successMessages) {      
    

    $("#modalCorrectUserInformation").find(".modal-body").empty();
    successMessages.forEach(message => {
       
        $("#modalCorrectUserInformation").find(".modal-body").html(`
            <i class="fa-regular fa-circle-check fa-3x" style="color:green"></i>
            <br>
            <br>
            ${message}        
        `);     

    });
    
    $('#modalCorrectUserInformation').modal('show');    
}

function showSuccessAccessAlert(successMessages) {      
    

    $("#modalCorrectUserAccess").find(".modal-body").empty();
    successMessages.forEach(message => {
       
        $("#modalCorrectUserAccess").find(".modal-body").html(`
            <i class="fa-regular fa-circle-check fa-3x" style="color:green"></i>
            <br>
            <br>
            ${message}        
        `);     

    });
    
    $('#modalCorrectUserAccess').modal('show');    
}

function showAlert(errorMessages, isErrorAlert) {      
    

    $("#modalErrors").find(".modal-body").empty();
    errorMessages.forEach(message => {

        if (message === "Invalid Password Format.") {
            message = "Invalid password format. The password must have between 8 and 16 characters, at least one digit, at least 1 special character, at least one lower case, at least one upper case and no whitespace";
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

function hideSuccessModal() {
    $('#modalCorrectMessage').modal('hide');
}

function showRequestErrors(jqXHR, textStatus) {

    var errorMessages = [];

    if (jqXHR.status === 0) {

        var message = 'Not connect: Verify Network.';
        errorMessages.push(message);
        
        showAlert(errorMessages, true);
        

    } else if (jqXHR.status == 404) {

        var message = 'Requested page not found [404]';
        errorMessages.push(message);
        
        showAlert(errorMessages, true);
        

    } else if (jqXHR.status == 500) {

        var message = 'Internal Server Error [500].';
        errorMessages.push(message);
        
        showAlert(errorMessages, true);
        

    } else if (jqXHR.status == 400) {

        var message = 'Check wrong fields';
        errorMessages.push(message);
        
        showAlert(errorMessages, true);
                

    } else if (textStatus === 'parsererror') {

        var message = 'Requested JSON parse failed.';
        errorMessages.push(message);

        showAlert(errorMessages, true);
       

    } else if (textStatus === 'timeout') {

        var message = 'Time out error.';
        errorMessages.push(message);
       
        showAlert(errorMessages, true);
        

    } else if (textStatus === 'abort') {

        var message = 'Ajax request aborted.';
        errorMessages.push(message);

        showAlert(errorMessages, true);
        

    } else {

        var message = 'Uncaught Error: ' + jqXHR.responseText;
        console.error(message);

    }
}
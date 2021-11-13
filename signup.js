const form = document.getElementById('form')
const email = document.getElementById('email')
const password = document.getElementById('password')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs(){
    //Item inputted into email box.
    const emailValue = email.value.trim();
    //Item inputted into password box
    const pwdValue = password.value.trim()
    
    //If email box is empty, display error.
    if(emailValue === ''){
        setErrorFor(email, 'Email cannot be blank');
    } 
    //If email is not correct format, display error
    else if(!isEmail(emailValue)) {
        
        setErrorFor(email, 'Email is not valid');
    } 
    //Successful email input
    else {
        setSuccessFor(email);
    }
    //If password box is empty, display error.
    if(pwdValue === ''){
        setErrorFor(password, 'Password cannot be blank');
    } 
    //Successful password input
    else {
        setSuccessFor(password);
    }

}

//Sets error for input box and displays error message to user.
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errormsg = formControl.querySelector('p');
    errormsg.innerText = message;
    formControl.className = 'form-control error'
    errormsg.style.visibility = "visible"

}

//Sets success, makes input box green, hides error message.
function setSuccessFor(input){
    const formControl = input.parentElement;
    const errormsg = formControl.querySelector('p');
    errormsg.style.visibility = "hidden";
    formControl.className = 'form-control success';
    
}
//Validates email format.
function isEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
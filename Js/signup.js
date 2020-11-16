var usernameElement = document.getElementsByClassName("username")[0];
var passwordElement = document.getElementsByClassName("password")[0];
var wrongs = document.getElementsByClassName("wrong"); // array(0=>username 1=>password)
var answer = document.getElementsByClassName("forgotPassAnswer")[0];
var signUpButton = document.getElementsByClassName("signup_button")[0];

var validPassword = false;
var validUsername = false;
var validAnswer = false;

signUpButton.disabled = true;

document.getElementsByClassName('login_form')[0].addEventListener('mousemove',()=>{
    if(validAnswer && validPassword && validUsername)
    { 
        signUpButton.disabled = false;    
        console.log="enabled";
    }else
    {
        signUpButton.disabled = true;
    }
});



if(wrongs[0] && wrongs[0].innerText=="User already exists !")
    wrongs[0].style.display = "inline";

usernameElement.addEventListener("focus", () => {
    wrongs[0].style.display = "none";
});


passwordElement.addEventListener("focus", () => {
    wrongs[1].style.display = "none";
});

usernameElement.addEventListener("blur", () => {
    var username = usernameElement.value;
    var res = /^[A-Za-z0-9_]{6,20}$/.test(username);
    wrongs[0].style.display = res ? "none" : "inline";
    validUsername=res;
    
});

passwordElement.addEventListener("blur", () => {
    var password = passwordElement.value;
    var res = /^[A-Za-z0-9_@*&~`.,"'|]{6,20}$/.test(password);
    wrongs[1].style.display = res ? "none" : "inline";
    validPassword=res;
});



answer.addEventListener("focus", () => {
    if(wrongs[2])
        wrongs[2].style.display = "none";
});

answer.addEventListener("blur", () => {
    var ans = answer.value.trim();
    if(wrongs[2])
     wrongs[2].style.display = ans ? "none" : "inline";
    if(ans)
        validAnswer=true;
    else
        validAnswer=false;
});




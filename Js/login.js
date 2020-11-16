var usernameElement = document.getElementsByClassName("username")[0];
var passwordElement = document.getElementsByClassName("password")[0];
var wrongs = document.getElementsByClassName("wrong"); // array(0=>username 1=>password)
var button = document.getElementsByClassName("login_button")[0];

document.addEventListener("DOMContentLoaded", function() {
    button.setAttribute("disabled", "disabled");
})

function checkPass(){
    var password = passwordElement.value;
    var res = /^[A-Za-z0-9_@*&~`.,"'|]{6,20}$/.test(password);
    return res;
}

function checkUser(){
    var username = usernameElement.value;
    var res = /^[A-Za-z0-9_]{6,20}$/.test(username);
    return res;
}

usernameElement.addEventListener("focus", function (){
    wrongs[0].style.display = "none";
});

passwordElement.addEventListener("focus", function (){
    wrongs[1].style.display = "none";
});

usernameElement.addEventListener("blur", function (){
    if(checkUser()){
        wrongs[0].style.display = "none";
        if(checkPass())
            button.removeAttribute("disabled");
    }
    else
        wrongs[0].style.display = "inline";
});

passwordElement.addEventListener("blur", function (){
    if(checkPass()){
        wrongs[1].style.display = "none";
        if(checkUser())
            button.removeAttribute("disabled");
    }
    else
        wrongs[1].style.display = "inline";
});
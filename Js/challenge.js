var para = document.querySelector("#para");
var dropdown = document.querySelector("#dropdown");
var title = document.querySelector("#challengeName");
var input = document.querySelector("#challengeInput"); 
var count = 0;
var tokens;
var startTime;
var endTime;

function insertPara(name, value){
    para.innerHTML = '';
    title.innerHTML = name;
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < value.length - 1; ++i){
        var span = document.createElement("span");
        span.innerHTML = value[i];
        fragment.appendChild(span);
      }
    para.appendChild(fragment);
    tokens = document.querySelectorAll("#para > span");
}

var xhr = new XMLHttpRequest();
xhr.open("POST", "./Database/getChallenges.php", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send();
xhr.onload = function() {
    console.log(xhr.responseText);
    obj = JSON.parse(xhr.responseText);
    insertPara(dropdown.value, obj[dropdown.value]);
}

dropdown.addEventListener("change", function() {
    insertPara(dropdown.value, obj[dropdown.value]);
});

input.addEventListener("focus", toggler);
input.addEventListener("blur", clearInput);

function clearInput(){
    input.value = '';
    input.removeEventListener("keydown", checker);
}

function toggler(){
    input.addEventListener("keydown", checker);
    startTime = new Date;
}

function checker(e){
    console.log(e.key);
    if(e.key == "Backspace"){
        count = --count > 0 ? count : 0;
        tokens[count].classList.remove("wrong");
        tokens[count].classList.remove("right");
        return;
    }
    if(!(/^[A-Za-z0-9"\'\:,\s]$/.test(e.key)) || e.ctrlKey){
        e.preventDefault();
        return;
    }
    if(tokens[count].innerHTML != e.key){
        tokens[count].classList.add("wrong");
    }
    else
        tokens[count].classList.add("right");
    ++count;
    // if(count == tokens.length)
        
}
var lessonsCompleted = "1.2";  // xhr returned
var errors = 0;
var active = false;
var startTime;
var endTime;

function generatePara(lessonsCompleted){
  lessonsCompleted = lessonsCompleted.replace(/\..+/, "");
  var letterPool = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];
  var para = "";

  switch (lessonsCompleted) {
    case "15":
      letterPool = letterPool.concat(["V", "M", "T", "Y", "G", "H", "Q", "P", "X", "B", "Z"]);
    case "14":
      letterPool = letterPool.concat(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    case "13":
      letterPool = letterPool.concat(["z", "?", ":", "<", ">", "/"]);
    case "12":
      letterPool = letterPool.concat(["x", "b"]);
    case "11":
      letterPool = letterPool.concat(["q", "p"]);
    case "10":
      letterPool = letterPool.concat(["g", "h", "'", '"']);
    case "9":
      letterPool = letterPool.concat(["t", "y"]);
    case "8":
      letterPool = letterPool.concat(["v", "m"]);
    case "7":
      letterPool = letterPool.concat(
        letterPool.filter((x) => /[a-z]/.test(x)).map((x) => x.toUpperCase())
      );
    case "6":
      letterPool = letterPool.concat([",", "."]);
    case "5":
      letterPool = letterPool.concat(["c", "n"]);
    case "4":
      letterPool = letterPool.concat(["w", "o"]);
    case "3":
      letterPool = letterPool.concat(["r", "u"]);
    case "2":
      letterPool = letterPool.concat(["e", "i"]);
  }
  
  // var words = Math.floor(Math.random() * (20 - 15 + 1) + 15);
  for(var i = 0; i < 1; ++i){
    var wordLength = Math.floor(Math.random() * (7 - 3 + 1) + 3);
    for(var j = 0; j < wordLength; ++j){
      para += letterPool[Math.floor(Math.random() * ((letterPool.length-1) - 0 + 1)) + 0];
    }
    para += " ";
  }
  return para;
}

function insertPara(para) {
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < para.length - 1; ++i){
    var span = document.createElement("span");
    span.innerHTML = para[i];
    fragment.appendChild(span);
  }
  document.querySelector("#para").append(fragment);
}

insertPara(generatePara(lessonsCompleted));

var para = document.querySelectorAll("#para > span");
var i = 0;

function clear(className){
  var wrongs = document.querySelectorAll("." + className);
  for(var i = 0; i < wrongs.length; ++i){
    wrongs[i].classList.remove(className);
  }
}

function toggler(e) {
  e.target.classList.toggle("inactive");
  if(active){
    document.removeEventListener("keydown", start);
    para[i].classList.remove("current");
    active = false;
    clear("wrong");
    clear("wrongKey");
  }
  else{
    document.addEventListener("keydown", start);
    para[i = 0].classList.add("current");
    active = true;
  }
}

document.querySelector("#para").addEventListener("click", toggler);

document.addEventListener("keyup", function() {
  clear("correctKey");
});

function entityParser(str){
  if(str == "&nbsp;")
    return " ";
  if(str == "&amp;")
    return "&";
  if(str == "&quot;")
    return "\"";
  if(str == "&apos;")
    return "'";
  if(str == "&lt;")
    return "<";
  if(str == "&gt;")
    return ">"
  return str;
}

function lightKeyboad(k, bool){
  k = entityParser(k);
  var keys = {
    "`" : "tilde",
    "~" : "tilde",
    "!" : "1",
    "@" : "2",
    "#" : "3",
    "$" : "4",
    "%" : "5",
    "^" : "6",
    "&" : "7",
    "*" : "8", 
    "(" : "9",
    ")" : "0",
    "-" : "minus",
    "_" : "minus",
    "+" : "equal",
    "=" : "equal",
    "[" : "bracketstart",
    "{" : "bracketstart",
    "]" : "bracketend",
    "}" : "bracketend",
    "\\" : "backslash",
    "|" : "backslash",
    ":" : "colon",
    ";" : "colon",
    "'" : "quotes",
    "\"" : "quotes",
    "," : "comma",
    "<" : "comma",
    "." : "fullstop",
    ">" : "fullstop",
    "/" : "forwardslash",
    "?" : "forwardslash"
  }
  var cssDict = {
    true : "correctKey",
    false : "wrongKey",
  }
  var query = "";
  if(k == " ")
    query = ".key-space";
  else if(/^[A-Za-z0-9]$/.test(k)){
    query = ".key-" + k.toLowerCase();
  }
  else
    query = ".key-" + (keys[k] || k.toLowerCase());
  ele = document.querySelectorAll(query);
  if(ele.length){
    ele[0].classList.add(cssDict[bool]);
    if(ele.length > 1)
      ele[1].classList.add(cssDict[bool]);
  }
}

function start(e) {
  clear("wrongKey");
  if(i == 0){
    startTime = new Date();
    console.log("started");
  }
  if(e.key == "CapsLock"){
    document.querySelector(".key-capslock").classList.toggle("green");
    return;
  }
  if(e.getModifierState("CapsLock")){
    document.querySelector(".key-capslock").classList.add("green");    
  }
  if(e.key == "Shift"){
    lightKeyboad("Shift", true);
    return;
  }
  e.preventDefault();
  console.log(e.key,para[i].innerHTML)
  if(e.key == entityParser(para[i].innerHTML)){
    lightKeyboad(e.key, true);
    para[i].classList.remove("current");
    ++i;
    if(para[i])
      para[i].classList.add("current");
  }
  else{
    para[i].classList.add("wrong");
    lightKeyboad(e.key, false);
    ++errors;
  }
  if(i == para.length) {
    console.log(errors);
    endTime = new Date;
    time = (endTime - startTime)/60000;
    var words = para.length/5;
    console.log("wpm " + words/time);
    document.querySelector("#para").innerHTML = '';
    insertPara(generatePara(lessonsCompleted));
    para = document.querySelectorAll("#para > span");
    i = errors = 0;
    para[i].classList.add("current");
  }
}
function getCurrentLesson(fun){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./Database/testAJAX.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
  xhr.onload = function(){
    console.log(xhr.responseText);
    obj = JSON.parse(xhr.responseText);
    // lessonCompleted, averageError, averageSpeed, totalSamples, lastError, lastWPM
    lessonsCompleted = obj["lessonCompleted"];
    if(fun)
      fun();
  }
}

var errors = 0;
var active = false;
var startTime;
var endTime;
var para;
var i = 0;
var obj;

getCurrentLesson(init);

function init(){
  insertPara(generatePara(lessonsCompleted));
  display(true);
  para = document.querySelectorAll("#para > span")
  document.querySelector("#para").addEventListener("click", toggler);
  document.addEventListener("keyup", function() {
    clear("correctKey");
  });
}

function display(bool) {
  if(bool){
    var sum = obj["totalSamples"] * obj["averageSpeed"] - obj["lastWPM"];
    if(obj["totalSamples"] != 1)
      obj["averageSpeed"] = (sum/(obj["totalSamples"]-1)).toFixed(2);
    else 
      obj["averageSpeed"] = sum;
    sum = obj["totalSamples"] * obj["averageError"] - obj["lastError"];
    if(obj["totalSamples"] != 1)
      obj["averageError"] = (sum/(obj["totalSamples"]-1)).toFixed(2);
    else
      obj["averageError"] = sum;
}
  document.querySelector(".wpm .counterValue").innerHTML = obj["lastWPM"];
  var change = (obj["lastWPM"] - obj["averageSpeed"]).toFixed(2);
  document.querySelector(".wpm .change").style.color = change > 0 ? "green" : "red";
  document.querySelector(".wpm .change").innerHTML = "(" + (change < 0 ? "" : "+") + change + ")";
  document.querySelector(".error .counterValue").innerHTML = obj["lastError"];
  change = (obj["lastError"]  - obj["averageError"]).toFixed(2);
  document.querySelector(".error .change").style.color = change < 0 ? "green" : "red";
  document.querySelector(".error .change").innerHTML = "(" + (change < 0 ? "" : "+") + change + ")";
}

function generatePara(lessonsCompleted) {
  console.log(lessonsCompleted)
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
  document.querySelector("#para").appendChild(fragment);
} 

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
    lightKeyboad(e.key, false);
    if(!para[i].classList.contains("wrong")){
      para[i].classList.add("wrong");
      ++errors;
    }
  }
  if(i == para.length) {
    endTime = new Date;
    var time = (endTime - startTime)/60000;
    var words = para.length/5;
    var wpm = (words/time).toFixed(2);
    var insertExecutor = function() {
      insertDB(parseInt(obj["totalSamples"]) + 1, wpm, errors);
      obj["lastError"] = errors;
      obj["lastWPM"] = wpm;
      display();
      console.log("wpm " + words/time + " error " + errors);
      document.querySelector("#para").innerHTML = '';
      insertPara(generatePara(lessonsCompleted));
      para = document.querySelectorAll("#para > span");
      i = errors = 0;
      para[i].classList.add("current");
    }
    getCurrentLesson(insertExecutor);
  }
}

function insertDB(testNo, wpm, errors) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./Database/testAJAX.php", true);
  xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({"testNo": testNo, "wpm": wpm, "errors": errors}));
  xhr.onload = function(){
    console.log(xhr.responseText);
  }
}
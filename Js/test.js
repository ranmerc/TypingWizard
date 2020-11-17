var lessonsCompleted = "1.1.1".replace(/\..+/, "");
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

for(var i = 0; i < 20; ++i){
  var wordLength = Math.floor(Math.random() * (7 - 3 + 1) + 3);
  for(var j = 0; j < wordLength; ++j){
    para += letterPool[Math.floor(Math.random() * ((letterPool.length-1) - 0 + 1)) + 0];
  }
  para += " ";
}

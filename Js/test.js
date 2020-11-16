var lessonsCompleted = "7.1.1".replace(/\..+/, "");
var letterPool = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];
switch (lessonsCompleted) {
  case "8":
    letterPool.concat(["v", "m"]);
    break;
  case "7":
    letterPool.concat(
      letterPool.filter((x) => /[a-z]/.test(x)).map((x) => x.toUpperCase())
    );
  case "6":
    letterPool.concat([",", "."]);
  case "5":
    letterPool.concat(["c", "n"]);
  case "4":
    letterPool.concat(["w", "o"]);
  case "3":
    letterPool.concat(["r", "u"]);
  case "2":
    letterPool.concat(["e", "i"]);
}
console.log(letterPool)
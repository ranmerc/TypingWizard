document.querySelector("#tetris").addEventListener("click", function(){
    window.location.href = "./wordTetris.html";
});

document.querySelector("#bubble").addEventListener("click", function(){
    window.location.href = "./bubleBurst.html";
});

document.querySelector("#bubble").addEventListener("mouseover", function() {
    document.querySelector("#backGround").style.backgroundColor = "red";
})

document.querySelector("#bubble").addEventListener("mouseout", function() {
    document.querySelector("#backGround").style.backgroundColor = "white";
})

document.querySelector("#tetris").addEventListener("mouseover", function() {
    document.querySelector("#backGround").style.backgroundImage = "url('./Images/tetris.jpg')";
})

document.querySelector("#tetris").addEventListener("mouseout", function() {
    document.querySelector("#backGround").style.backgroundImage = "";
    document.querySelector("#backGround").style.backgroundColor = "white";
})
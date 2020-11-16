document.querySelector("#nav").remove();

var course=document.getElementsByClassName("courseCard")[0];
var practice=document.getElementsByClassName("practiceCard")[0];
var games=document.getElementsByClassName("gamesCard")[0];
var statistics=document.getElementsByClassName("statisticsCard")[0];


course.addEventListener('click',function(){
    window.location.href="lessons.php";
});

practice.addEventListener('click',function(){

});

games.addEventListener('click',function(){
   // window.location.href="lesson.php";
});

statistics.addEventListener('click',function(){
    window.location.href="statistics.php";
});


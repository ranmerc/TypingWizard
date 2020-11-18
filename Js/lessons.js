var lessonTitles = document.getElementsByClassName("lesson_title");
var lessonContents = document.getElementsByClassName("lesson_content_div")[0];
var ITEMS_ADDED = false;

var xhr = new XMLHttpRequest();
xhr.open("POST","./Database/getSubLesson.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send();

xhr.onload = function(){
    lessonContents.innerHTML = xhr.responseText;
    // lessonContents.style.display = "inline";
}

function getTitles(lessonId)
{
    xhr.open("POST", "./Database/getSubLesson.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("lessonid=" + lessonId);
}

for(var i = 0; i < lessonTitles.length; ++i){
    lessonTitles[i].addEventListener("mouseover", function (e) {
     getTitles(this.dataset.lesson);
      ITEMS_ADDED = false;
    },false);
}

var lessonTitleDiv = document.getElementsByClassName("lesson_title_div")[0];

document.getElementsByClassName("lesson_content_div")[0].addEventListener('DOMNodeInserted',function(){
    if(ITEMS_ADDED == false)
    {
        addAllLessons();
        ITEMS_ADDED = true;
    }
});

var lessonJSON;

function getLessons(lessonId)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST","./Database/getLessons.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonId);

    xhr.onload = function(){
        if(this.status == 200)
        {
            lessonJSON = JSON.parse(xhr.responseText);
            // insert lessons into dom from here
            console.log(xhr.responseText);
        }
    }
}

function addAllLessons()
{
    var lessonTitles = document.getElementsByClassName("lesson_name");
    var size = lessonTitles.length;
    //alert(lessonTitles+"  "+lessonTitles.length);
    for(i = 0; i < size; i++)
    {
        lessonTitles[i].addEventListener('click',function(){
            var lessonId = this.dataset.lesson_id;
            getLessons(lessonId);
        },false);
    }
}


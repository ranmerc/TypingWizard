var lessonTitles = document.getElementsByClassName("lesson_title");
var lessonContents = document.getElementsByClassName("lesson_content_div")[0];


function getTitles(lessonId)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./Database/getSubLesson.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("lessonid=" + lessonId);
    xhr.onload = function(){
         lessonContents.innerHTML = xhr.responseText;
        addAllLessons();
    }
}

for(var i = 0; i < lessonTitles.length; ++i){
    
    lessonTitles[i].addEventListener("mouseover", function (e) {
        getTitles(this.dataset.lesson);
    },false);

}

var lessonJSON;
var CURRENT_LESSON;
function getLessons(lessonId)  
{
    CURRENT_LESSON=lessonId;
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
            return lessonJSON;
        }
    }
}

function addAllLessons()
{
    var lessonTitles = document.getElementsByClassName("lesson_name");
    var size = lessonTitles.length;
    for(i = 0; i < size; i++)
    {
        lessonTitles[i].addEventListener('click',function(){
            var lessonId = this.dataset.lesson_id;
            getLessons(lessonId);
        },false);
    }
}


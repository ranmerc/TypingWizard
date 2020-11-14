var lessonTitles=document.getElementsByClassName("lesson_title");
var lessonContents=document.getElementsByClassName("lesson_content_div")[0];
var ITEMS_ADDED=false;

var xhr=new XMLHttpRequest();
xhr.open("POST","getSubLesson.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send();

xhr.onload=function(){
    lessonContents.innerHTML=xhr.responseText;
    lessonContents.style.display="inline";
}

lessonTitles[0].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[0].dataset.lesson);
    ITEMS_ADDED=false; 

});


lessonTitles[1].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[1].dataset.lesson);
    ITEMS_ADDED=false;
    
});

lessonTitles[2].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[2].dataset.lesson);
    ITEMS_ADDED=false;
    
});


lessonTitles[3].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[4].dataset.lesson);
    ITEMS_ADDED=false;
    
});


lessonTitles[4].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[4].dataset.lesson);
    ITEMS_ADDED=false;
    
});

lessonTitles[5].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[5].dataset.lesson);
    ITEMS_ADDED=false;
    
});


lessonTitles[6].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[6].dataset.lesson);
    ITEMS_ADDED=false;

});


lessonTitles[7].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[7].dataset.lesson);
    ITEMS_ADDED=false;
    
});


lessonTitles[8].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[8].dataset.lesson);
    ITEMS_ADDED=false;
});


lessonTitles[9].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[9].dataset.lesson);
    ITEMS_ADDED=false;
    
});


lessonTitles[10].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[10].dataset.lesson);
    ITEMS_ADDED=false;
    
});

lessonTitles[11].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[11].dataset.lesson);
    ITEMS_ADDED=false;

});

lessonTitles[12].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[12].dataset.lesson);
    ITEMS_ADDED=false;
    
});

lessonTitles[13].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[13].dataset.lesson);
    ITEMS_ADDED=false;

});

lessonTitles[14].addEventListener('click',function(e){
    xhr.open("POST","getSubLesson.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonTitles[14].dataset.lesson);
    ITEMS_ADDED=false;
});


var lessonTitleDiv=document.getElementsByClassName("lesson_title_div")[0];



document.getElementsByClassName("lesson_content_div")[0].addEventListener('DOMNodeInserted',function(){
    if(ITEMS_ADDED==false)
    {
        addAllLessons();
        ITEMS_ADDED=true;
    }

});

var lessonJSON;

function getLessons(lessonId)
{
    var xhr=new XMLHttpRequest();
    xhr.open("POST","getLessons.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonId);

    xhr.onload=function(){
        if(this.status==200)
        {
            lessonJSON=JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
        }
    }
}

function addAllLessons()
{
var lessonTitles=document.getElementsByClassName("lesson_name");

var size=lessonTitles.length;
//alert(lessonTitles+"  "+lessonTitles.length);

    for(i=0;i<size;i++)
    {
    lessonTitles[i].addEventListener('click',function(){
        var lessonId=this.dataset.lesson_id;
        getLessons(lessonId);
    },false);
    }
    
}


























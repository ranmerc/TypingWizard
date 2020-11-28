var lessonTitles = document.getElementsByClassName("lesson_title");
var lessonContents = document.getElementsByClassName("lesson_content_div")[0];
var subLessonTitle = document.getElementsByClassName('subLessonTitle')[0];
var displayText = document.getElementsByClassName('displayText')[0];
var typingSpaceTextarea=document.getElementsByClassName('typingSpaceTextarea')[0];
var timer=document.getElementsByClassName('timer')[0];
var error=document.getElementById('error');
var speed=document.getElementById('speed');
var keyboard=document.getElementById('keyboard');
var lessonTitle=document.getElementsByClassName('lessonTitle')[0];

//globals
var Lesson;
var SubLesson;
var SubSubLesson;
var characterError=0;
var usersSpeed=0;
var charTyped=0;


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

console.log(" total lesson titles : "+lessonTitles.length);

for(var i = 0; i < lessonTitles.length; ++i){
    
    lessonTitles[i].addEventListener("mouseover", function (e)
    {
        getTitles(this.dataset.lesson);
    },false);

}

var lessonJSON;
function getLessons(lessonId)  
{
    var str=lessonId.split('.');
    Lesson=str[0];
    SubLesson=str[1];
    var xhr = new XMLHttpRequest();
    xhr.open("POST","./Database/getLessons.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("lessonid="+lessonId);

    xhr.onload = function(){
        if(this.readyState==4 && this.status == 200)
        {
            lessonJSON = JSON.parse(xhr.responseText);
            // console.log(xhr.responseText);
            sendText(lessonJSON);//added
        }
    }
}

function addAllLessons()
{
    var lessonTitles = document.getElementsByClassName("lesson_name");
    var size = lessonTitles.length;
    //here lessonTitles.length gives sub lessons count
    for(i = 0; i < size; i++)
    {
        lessonTitles[i].addEventListener('click',function(){
            var lessonId = this.dataset.lesson_id;
            console.log("lessonId : "+lessonId);//gives 1.1 or 1.2 etc if clicked then travel from 1.1 to 1.1.1 using count in it
            SubSubLesson=0;
            clearInterval(interval);
            timer.innerHTML="00 : 00";
            startOnce=1;
            characterError=0;
            error.innerHTML=characterError;
            charTyped=0;
            speed.innerHTML="0 WPM";
            spanCount=0;

            spanCountPlus=0;//for nextkeylit function
            getLessons(lessonId);
        },false);
    }
}

//coding from here
var totalLessonIdsInLessonsCompleted;
var totalLessonIds;

function getLessonsCompleted()
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST","./Database/getLessonsCompleted.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send();

    xhr.onload = function(){
        if(this.readyState==4 && this.status == 200)
        {
            var lessonId=JSON.parse(xhr.responseText);
            totalLessonIdsInLessonsCompleted=lessonId[1];
            totalLessonIds=lessonId['totalLessonIds'];
            console.log("lessonid from responseText :"+totalLessonIds)
            if(lessonId[0]=='0.0.0')
            {
                Lesson=1;
                SubLesson=1;
                SubSubLesson=0;
                console.log("current Lesson :"+Lesson)
            }
            else
            {
                var str=lessonId[0].split('.')
                Lesson=str[0];
                SubLesson=str[1];
                SubSubLesson=str[2];
                console.log("lesson :"+Lesson+"."+SubLesson+"."+SubSubLesson)
            }

            getLessons(Lesson+'.'+SubLesson);
        }
    }
}


function sendText(paraString)
{
    typingSpaceTextarea.value=null;
    console.log(".... :"+SubSubLesson);
    console.log("15.10.10 :"+paraString[SubSubLesson])
    if(SubSubLesson<paraString.count)
    {
        //console.log("paraString[SubSubLesson] :"+paraString[SubSubLesson])
        var str=paraString[SubSubLesson].split('');
        var charspan;
        subLessonTitle.innerHTML=paraString.lessonName;
        lessonTitle.innerHTML="Lesson "+Lesson;
        displayText.innerHTML=null;
        for (var i = 0; i < str.length; i++)
        {
            if(str[i]=='/')
            {
                if(str[i+1]=='n')
                {
                    charspan=document.createElement('span');
                    charspan.innerHTML='<br>';
                    displayText.appendChild(charspan);
                    i++;
                    continue;
                }
            }   

            charspan=document.createElement('span');
            charspan.innerHTML=str[i];
            displayText.appendChild(charspan);
        }
        nextkeylit('a');
    }
    else if(paraString.count==0)
    {
        //Lesson completed
        console.log("else if");
        Lesson++;
        SubLesson=1;
        characterError=0;
        error.innerHTML=characterError;
        startOnce=1;
        clearInterval(interval);
        timer.innerHTML="00 : 00";
        charTyped=0;
        speed.innerHTML="0 WPM";
        getLessons(Lesson+'.'+SubLesson);
    }
    else
    {
        //last complted but all not complted
        console.log("totalLessonIdsInLessonsCompleted in else :"+totalLessonIdsInLessonsCompleted)
        console.log("totalLessonIds :"+totalLessonIds);
        if(Lesson==15 && SubLesson==10 && SubSubLesson==10 && totalLessonIdsInLessonsCompleted!=totalLessonIds)
        {
            revisit();//to revisit if last is completed
            
        }
        else if(Lesson==15 && SubLesson==10 && SubSubLesson==10 && totalLessonIdsInLessonsCompleted==totalLessonIds)
        {
            revisit();
        }

        else
        {
            //Sublesson completed
        SubSubLesson=0;
        SubLesson++;
        clearInterval(interval);
        timer.innerHTML="00 : 00";
        startOnce=1;
        characterError=0;
        error.innerHTML=characterError;
        charTyped=0;
        speed.innerHTML="0 WPM";
        getLessons(Lesson+'.'+SubLesson);
        }
        
    }
    
}

function revisit()
{
    if(Lesson==15 && SubLesson==10 && SubSubLesson==10 && totalLessonIdsInLessonsCompleted!=totalLessonIds)
    {
            var req = new XMLHttpRequest();
            req.open("POST","./Database/getMinLessonsNotCompleted.php",true);
            req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            req.send();
            req.onload=function(){
                if(this.readyState==4 && this.status==200)
                {
                    console.log("after onload////");
                    var lessond=JSON.parse(req.responseText);
                    console.log("lessonid from responseText :"+lessond)
                    var str=lessond.split('.')
                    Lesson=str[0];
                    SubLesson=str[1];
                    SubSubLesson=--str[2];
                    console.log("SubSublesson from  :"+SubSubLesson)
                    getLessons(Lesson+'.'+SubLesson);
                }
            }
    }

    else if(Lesson==15 && SubLesson==10 && SubSubLesson==10 && totalLessonIdsInLessonsCompleted==totalLessonIds)
    {
        Lesson=1;
        SubLesson=1;
        SubSublesson=0;
        getLessons(Lesson+'.'+SubLesson);
    }
    
}

function htmlEntities(str)
{
    if(str=="&nbsp;")
        return " ";
    if(str=="&amp;")
        return "&";
    if(str=="&quot;")
        return "\"";
    if(str=="&apos;")
        return "'";
    if(str=="&lt;")
        return "<";
    if(str=="&gt;")
        return ">"
    return str;
}


function funSwitch(value)
{
    console.log("funSwitch :"+value)
    if(value=='`' || value=='~')
        return 'tilde';
    if(value=='!' || value=='1')
        return 'one';
    if(value=='@' || value==2)
        return 'two';
    if(value=='#' || value==3)
        return 'three';
    if(value=='$' || value==4)
        return 'four';
    if(value=='%' || value==5)
        return 'five';
    if(value=='^' || value==6)
        return 'six';
    if(value=='&' || value==7)
        return 'seven';
    if(value=='*' || value==8)
        return 'eight';
    if(value=='(' || value==9)
        return 'nine';
    if(value==')' || value==0)
        return 'zero';
    if(value=='-' || value=='_')
        return 'minus';
    if(value=='+' || value=='=')
        return 'equal';
    if(value=='[' || value=='{')
        return 'bracketstart';
    if(value=='}' || value==']')
        return 'bracketend';
    if(value=='\\' || value=='|')
        return 'backslash';
    if(value==';' || value==':')
        return 'colon';
    if(value=='\'' || value=='\"')
        return 'quotes';
    if(value==',' || value=='<')
        return 'comma';
    if(value=='.' || value=='>')
        return 'fullstop';
    if(value=='/' || value=='?')
        return 'forwardslash';

    return value;
}

typingSpaceTextarea.addEventListener('keydown',match);
var spanCount=0;

function match(e)
{
    //special key pressed
    if(e.getModifierState("CapsLock"))
    {
        document.querySelector(".key-CapsLock").style.background="green";    
    }
    else
    {
        document.querySelector(".key-CapsLock").style.background="";
    }
    if(e.key=='Shift')
    {
        document.querySelectorAll(".key-Shift")[0].style.background="green";
        document.querySelectorAll(".key-Shift")[1].style.background="green";
    }
    if(e.key=='Backspace')
    {
        e.preventDefault();
        document.querySelector(".key-backspace").style.background="green";
    }
    if(e.key=='Tab')
    {
        e.preventDefault();
        document.querySelector(".key-tab").style.background="green";
    }
    document.onkeyup=function(){
        document.querySelectorAll(".key-Shift")[0].style.background="";
        document.querySelectorAll(".key-Shift")[1].style.background="";
        document.querySelector(".key-backspace").style.background="";
        document.querySelector(".key-tab").style.background="";
    }
    //

    if(startOnce==1)
    {
        startOnce++;
        startTime();
    }
    
    var eText=displayText.querySelectorAll('span');

     //clear wrong key
    if(spanCount<eText.length)
    {
        document.querySelector('.key-'+wrongKeyClear).style.background="";
    }
    

    if(/^[a-zA-Z0-9`~!@#$%\^&\*()_\-\+=\{\}\[\]:;'"\\|<>,\.\?/\" "]$/.test(e.key) || e.key=='Enter')
    {
        charTyped++;
        if(spanCount<eText.length)
        {
            console.log("eText innerHTML :"+eText[spanCount].innerHTML)
            if(htmlEntities(eText[spanCount].innerHTML)==e.key)
            {
                eText[spanCount].style.color='gray';
            }
            else if(eText[spanCount].innerHTML=='<br>')
            {
                if(e.key=='Enter')
                {
                    //next span
                }
                else
                {
                    eText[spanCount].style.color="red";
                    eText[spanCount].style.textDecoration="underline";
                    characterError++;
                    error.innerHTML=characterError;
                    wrongKeyPressed=funSwitch(htmlEntities(e.key.toLowerCase()));
                    wrongKeyPressedFun();
                }
            }
            else
            {
                eText[spanCount].style.color="red";
                eText[spanCount].style.textDecoration="underline";
                characterError++;
                error.innerHTML=characterError;
                wrongKeyPressed=funSwitch(htmlEntities(e.key.toLowerCase()));
                console.log("wrongKeyPressed :"+wrongKeyPressed);
                wrongKeyPressedFun();
            }
            spanCount++;
            
            if(spanCount==eText.length)
            {
                //SubSublesson completed
                //enter in lessonsCompleted database
                var xhh = new XMLHttpRequest();
                xhh.open("POST","./Database/putLessonsCompleted.php",true);
                xhh.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                console.log(" lessons completed.... ");

                xhh.send("lessonId="+(Lesson+"."+SubLesson+"."+(++SubSubLesson)));

                console.log("Lesson :"+Lesson+"."+SubLesson+"."+SubSubLesson);
                spanCount=0;
                //SubSubLesson++;
                console.log("SubSubLesson entered in DB:"+SubSubLesson);

                //clear last wrong key pressed
                document.querySelector('.key-'+wrongKeyClear).style.background="";

                getLessons(Lesson+'.'+SubLesson);

            }
        }
    }
    else
        e.preventDefault();
}

//wrong key pressed show on red
function wrongKeyPressedFun()
{
    document.querySelector(".key-"+wrongKeyPressed).style.background="red";
    wrongKeyClear=wrongKeyPressed;
    console.log("wrong colored~~~~~~~~~~")
    return;
}


var startT;
var updatedTime;
var minutes;
var seconds;
var second;
var startOnce=1;
var interval;
var difference;

function startTime()
{
    startT= new Date().getTime();
    interval=setInterval(showTime,1);
}

function showTime()
{
    updatedTime = new Date().getTime();
    difference = updatedTime - startT;
    minutes=Math.floor(difference/(1000*60));
    seconds = Math.floor(difference / 1000);
    second = Math.floor(difference / 1000);

    
    speed.innerHTML=Math.round((charTyped/5)/(second/60))+"WPM";

    if(seconds>=60)
    {
        seconds=seconds%60;
    }
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    timer.innerHTML=minutes+" : "+seconds;
    
}

//if capslock is on and click on next lesson or sublesson, show it
document.addEventListener('click',e=>{
    if(e.getModifierState("CapsLock"))
    {
        document.querySelector(".key-CapsLock").style.background="green";    
    }
})


var spanCountPlus=0;
var dText;
var keylight;
var keyclear='a';
var key;//to select class
var wrongKeyPressed;
var wrongKeyClear='tab';
var spanCountMinus=0;

typingSpaceTextarea.addEventListener('keydown',e=>{
    var val=e.key;
    val=htmlEntities(val);
    nextkeylit(val);
})

function nextkeylit(e)
{
    console.log("spanCountPlus :"+spanCountPlus);
    dText=displayText.querySelectorAll('span');
    console.log("dText span length :"+dText.length);
    if(/^[~`0-9a-zA-Z!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\<>,\./\/\?" "]$/.test(e) || e=='Enter')
    {
        if(spanCountPlus!=0)
            dText[spanCountMinus].style.textDecoration="";
        previousKeyClear();
    }
    

    if(spanCountPlus<dText.length)
    {
        if(/^[~`0-9a-zA-Z!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\<>,\./\/\?" "]$/.test(e) || e=='Enter')//if these key are pressed then spancountplus++
        {
            //current key underline
            dText[spanCountPlus].style.color="blue";
            dText[spanCountPlus].style.textDecoration="underline";
            spanCountMinus=spanCountPlus;

            console.log("passed value :"+e)
            keylight=dText[spanCountPlus].innerHTML.toLowerCase();
            
            keylight=htmlEntities(keylight);
            if(/^[~`0-9!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\<>,\./\/\?]$/.test(keylight))
            {
                keylight=funSwitch(keylight);
            }
            if(keylight=='<br>')
            {
                keylight="Enter";
            }
            console.log("key glow :"+keylight);
            key=document.querySelector(".key-"+keylight);
            key.style.background="green";
            keyclear=keylight;
            spanCountPlus++;
        }
        else{

        }
        
    }
    else
    {
        spanCountPlus=0;
    }
}

function previousKeyClear()
{
    console.log("key clear :"+keyclear);
    console.log("-----------------");
    key=document.querySelector(".key-"+keyclear);
    key.style.background="";
    return;
}


getLessonsCompleted();

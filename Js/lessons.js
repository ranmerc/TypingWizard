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
            //console.log(xhr.responseText);
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
            timer.innerHTML="Time<br>"+"00 : 00";
            startOnce=1;
            characterError=0;
            error.innerHTML="Errors:"+characterError;
            charTyped=0;
            speed.innerHTML="Speed:0 WPM";
            spanCount=0;

            keyvalue=dText[previousSpanCount].innerHTML.toLowerCase();
            keyvalue=htmlEntities(keyvalue);
            if(/^[~`0-9!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\<>,\./\/\?]$/.test(keyvalue))
            {
                keyvalue=funSwitch(keyvalue);
            }
            keyPrevious=document.querySelector(".key-"+keyvalue);
            keyPrevious.style.background="";
            if(once==2)
            {
                document.querySelector('.key-'+previousClickedKey).style.background="";
                once=1;
            }
            once=1;
            dText=['1'];
            nextsublessonKeyClear=2;
            spanCountPlus=0;

            getLessons(lessonId);
        },false);
    }
}

//coding from here

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
            console.log("lessonid from responseText :"+lessonId)
            if(lessonId=='0.0.0')
            {
                Lesson=1;
                SubLesson=1;
                SubSubLesson=0;
                console.log("okok :"+Lesson)
            }
            else
            {
                var str=lessonId.split('.')
                Lesson=str[0];
                SubLesson=str[1];
                SubSubLesson=str[2];
            }

            getLessons(Lesson+'.'+SubLesson);
        }
    }
}


function sendText(paraString)
{
    typingSpaceTextarea.value=null;
    if(SubSubLesson<paraString.count)
    {
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
        firstKeyLit();
    }
    else if(paraString.count==0)
    {
        //Lesson completed
        Lesson++;
        SubLesson=1;
        characterError=0;
        error.innerHTML="Errors:"+characterError;
        startOnce=1;
        clearInterval(interval);
        timer.innerHTML="Time<br>"+"00 : 00";
        charTyped=0;
        speed.innerHTML="Speed:0 WPM";

        keyvalue=dText[previousSpanCount].innerHTML.toLowerCase();
            keyvalue=htmlEntities(keyvalue);
            if(/^[~`0-9!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\<>,\./\/\?]$/.test(keyvalue))
            {
                keyvalue=funSwitch(keyvalue);
            }
            console.log("next lesson keyPrevious:"+keyvalue)
            keyPrevious=document.querySelector(".key-"+keyvalue);
            keyPrevious.style.background="";
            if(once==2)
            {
                document.querySelector('.key-'+previousClickedKey).style.background="";
                once=1;
            }

            once=1;
            dText=['1'];
            nextsublessonKeyClear=2;
            spanCountPlus=0;

        getLessons(Lesson+'.'+SubLesson);
    }
    else
    {
        //Sublesson completed
        SubSubLesson=0;
        SubLesson++;
        clearInterval(interval);
        timer.innerHTML="Time<br>"+"00 : 00";
        startOnce=1;
        characterError=0;
        error.innerHTML="Errors:"+characterError;
        charTyped=0;
        speed.innerHTML="Speed:0 WPM";
        getLessons(Lesson+'.'+SubLesson);
        firstKeyLit();
    }
    
    // firstKeyLit();//for keyboard color
    
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
}

typingSpaceTextarea.addEventListener('keydown',match);
var spanCount=0;
var keyvalue;
var once=1;

function match(e)
{
    //key light
    if(once==2)
    {
        document.querySelector('.key-'+previousClickedKey).style.background="";
        once=1;
    }

    if(spanCountPlus<dText.length && (/^[a-zA-Z0-9`~!@#$%\^&\*()_\-\+=\{\}\[\]:;'"\\|\<\>,\.\?/\" "]$/.test(e.key) || e.key=='Enter'))
    {
        
        console.log("spanCountPlus :"+spanCountPlus);
        console.log("dText.length :"+dText.length);
        keyvalue=dText[previousSpanCount].innerHTML.toLowerCase();
        keyvalue=htmlEntities(keyvalue);
        if(/^[~`0-9!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\\<\>,\./\/\?]$/.test(keyvalue))
        {
            keyvalue=funSwitch(keyvalue);
        }
        if(keyvalue=='<br>')
            keyvalue='Enter';
        keyPrevious=document.querySelector(".key-"+keyvalue);
        keyPrevious.style.background="";


        keyvalue=dText[spanCountPlus].innerHTML.toLowerCase();
        console.log("kkeeyy :"+keyvalue)
            keyvalue=htmlEntities(keyvalue);


        if(/^[~`0-9!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\\<\>,\./\/\?]$/.test(keyvalue))
        {
            keyvalue=funSwitch(keyvalue);
        }
        if(keyvalue=='<br>')
            keyvalue='Enter';
        key=document.querySelector(".key-"+keyvalue);
        key.style.background="green";
        console.log("next key green :"+keyvalue)
        previousSpanCount=spanCountPlus;
        spanCountPlus++;  
    }

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
    if(/^[a-zA-Z0-9`~!@#$%\^&\*()_\-\+=\{\}\[\]:;'"\\|<>,\.\?/\" "]$/.test(e.key) || e.key=='Enter')
    {
        charTyped++;
        if(spanCount<eText.length)
        {
            console.log("eText :"+eText[spanCount].innerHTML)
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
                    if(/^[~`0-9!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\<>,\./\/\?]$/.test(e.key))
                    {
                        keyvalue=funSwitch(e.key);
                    }
                    else
                    {
                        keyvalue=e.key;
                    }
                    document.querySelector('.key-'+keyvalue).style.background="red";
                    previousClickedKey=keyvalue;
                    once=2;
                    characterError++;
                    error.innerHTML="Errors:"+characterError;

                }
            }
            else
            {
                eText[spanCount].style.color="red";
                eText[spanCount].style.textDecoration="underline";
                if(/^[~`0123456789!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\<>,\./\/\?]$/.test(e.key))
                {
                    keyvalue=funSwitch(e.key);
                }
                else
                {
                    keyvalue=e.key;
                }
                
                document.querySelector('.key-'+keyvalue).style.background="red";
                previousClickedKey=keyvalue;
                once=2
                characterError++;
                error.innerHTML="Errors:"+characterError;
            }
            spanCount++;
            
            if(spanCount==eText.length)
            {
                //SubSublesson completed
                //enter in lessonsCompleted database

                var xhh = new XMLHttpRequest();
                xhh.open("POST","./Database/putLessonsCompleted.php",true);
                xhh.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xhh.send("lessonId="+(Lesson+"."+SubLesson+"."+(SubSubLesson+1)));

                console.log("Lesson :"+Lesson+"."+SubLesson+"."+SubSubLesson);
                spanCount=0;
                SubSubLesson++;
                console.log("SubSubLesson :"+SubSubLesson);
                getLessons(Lesson+'.'+SubLesson);

            }
        }
    }
    else
        e.preventDefault();
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

    
    speed.innerHTML="Speed:"+Math.round((charTyped/5)/(second/60))+"WPM";

    if(seconds>=60)
    {
        seconds=seconds%60;
    }
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    timer.innerHTML="Time<br>"+minutes+" : "+seconds;
    
}

var spanCountPlus=0;
var previousSpanCount=0;
var dText=['1'];
var key;
var keyPrevious;
var nextsublessonKeyClear=2;
var clickedkey;
var previousClickedKey;
function firstKeyLit()
{
    if(spanCountPlus==dText.length)
    {
        spanCountPlus=0;
        nextsublessonKeyClear=1;
    }

    if(nextsublessonKeyClear==1)
    {
        keyvalue=dText[previousSpanCount].innerHTML.toLowerCase();
        keyvalue=htmlEntities(keyvalue);
        if(/^[~`0-9!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\<>,\./\/\?]$/.test(keyvalue))
        {
            keyvalue=funSwitch(keyvalue);
        }
        keyPrevious=document.querySelector(".key-"+keyvalue);
        keyPrevious.style.background="";
        nextsublessonKeyClear=2;
    }
    dText=[];
    dText=displayText.querySelectorAll('span');
    keyvalue=dText[spanCountPlus].innerHTML.toLowerCase();
    keyvalue=htmlEntities(keyvalue);

    if(/^[~`0-9!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;\'\"|\\\<\>,\./\/\?]$/.test(keyvalue))
    {
        keyvalue=funSwitch(keyvalue);
    }

    key=document.querySelector(".key-"+keyvalue);
    console.log("first key Llight :"+key.innerHTML);
    key.style.background="green";
    previousSpanCount=spanCountPlus;
    spanCountPlus++;

}

getLessonsCompleted();

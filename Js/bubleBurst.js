var words=[
	['a','b','c','d','e','f','g','h','i','j','k'],
	['is','an','as','ty','ip','dy','sd','do','en','tt','oo','fa','to','ex','er'],
	['aba'	,'abs','ace','act','add','ado','aft','age','ago','aha','aid','aim','air','ala','ale'],
	['able','acid','aged','also','area','army','away','baby','back','ball','band','bank','base','bath','bear'],
	['about','above','abuse','actor','acute','admit','adopt','adult','after','again','agent','agree','ahead','alarm','album'],
	['abroad','accept','access','across','acting','action','active','actual','advice','advise','affect','afford','afraid','agency','agenda'],
	['ability','absence','academy','account','accused','achieve','acquire','address','advance','adverse','advised','adviser','against','airline','airport'],
	['absolute','abstract','academic','accepted','accident','accuracy','accurate','achieved','acquired','activity',
	'actually','addition','adequate','adjacent','adjusted'],
	['AARDVARKS','AARONICAL','AARONITIC','AASVOGELS','ABACINATE','ABERRANCY',
'ABERRANTS','ABERRATED','ABERRATOR','ABETMENTS','ABREACTED','ABREPTION','ABREUVOIR','ABRIDGERS','ABRIDGING']
	];



var startButton=document.getElementById("startSection");
var gameSection=document.getElementById("gameSection");
var instructions=document.getElementsByClassName("instruction")[0];
var scoreSection=document.getElementById('scoreSection');
var realScore=document.getElementById('realScore');


var startTime=0;
var level=0;
var velcity=1;
var endTime;
var errors=0;


instructions.addEventListener('mouseover',function(e){
    this.style.opacity=1.0;
});

instructions.addEventListener('mouseout',function(e){
	if(startTime!=0)
    	this.style.opacity=0.2;
});



function startGame()
{
	document.getElementsByClassName("level")[0].innerText=(level+1);
	startTime=(new Date()).getTime();
	ball=[];
	arr=words[level];
	for(var i=0;i<arr.length;i++)
	{
	ball[i]=new Ball(arr[i]);
	}
	bubleBursted=0;
    errors=0;
    realScore.innerHTML="Score :"+bubleBursted;
    realScore.style.visibility='visible';
	animate();
}


function gameOver()
{
	gameSection.style.display="none";
	scoreSection.style.display="block";
	var seconds=((new Date()).getTime()-startTime)/1000;
	document.getElementById('timeTaken').innerText=("Time Taken: "+seconds);
	var feedback=document.getElementById('feedback');
	if(Math.round(seconds)<=(20))
	{
		feedback.innerText="Welcome to next Level";
		level=level+1;
		if(level%(words.length)===0)
		{
			console.log("speend increased");
			velcity=level;
		}
	}
	else
	{
		feedback.innerText="You could'nt clear this round, TRY AGAIN!!!";
	}

	startButton.style.display="block";
    realScore.style.visibility='hidden';
	
}




startButton.addEventListener('click',function(e)
{
    this.style.display="none";
    gameSection.style.display="block";
	instructions.style.opacity=0.2;
	scoreSection.style.display="none";
	startGame();

});



var canvas=document.getElementById('canvas');
var c=canvas.getContext("2d");
	
var tx=window.innerWidth;
var ty=window.innerHeight*0.65;

var ball=[];
	
canvas.height=ty;
canvas.width=tx;


	var arr=words[level];


function randomColor()
	{
	return ("rgba("+ Math.round(Math.random()*250)+","
				+Math.round(Math.random()*250)+","
				+Math.round(Math.random()*250)+","
				+(Math.random()*10)/10+")"
				);
}


function Ball(word)
{
	this.word=word;
	
	this.color=randomColor();
	this.radius=Math.round(Math.random()*40)+(level+10);
	this.startradius=this.radius;
	
	this.x=Math.round(Math.random()*(tx- 2*this.radius));
	this.y=Math.round(Math.random()*(ty-2*this.radius));
	
	
	this.dy=velcity;
	this.dx=velcity;
	
	
	//console.log("charecter"+ this.charecter+"     dx:"+this.dx+"  dy:"+this.dy+"   x-"+this.x+"  y:"+this.y);
	
		this.draw=function(){
			c.beginPath();
			c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
			c.fillStyle=this.color;
			c.fill();
		
			c.font = '20pt Calibri';
			c.fillStyle = 'black';
            c.textAlign = 'center';
            c.fillText(this.word, this.x, this.y+3);
		
	}
	
	this.update=function()
	{
			if((this.x+this.radius)>=(tx) || (this.x+this.radius)<=(0)) 
			{
				this.dx=-(this.dx);
				
			}
			if( (this.y+this.radius)>=(ty) || (this.y+this.radius)<=(0))
			{
				this.y=0;
				//this.dy=-(this.dy);
			}
        	//this.x+=this.dx;
			this.y+=this.dy;

		this.draw();

		}
	
}



function animate()
{
	requestAnimationFrame(animate);
	c.clearRect(0,0,tx,ty);
	
	for(var i=0;i<ball.length;i++)
		if(ball[i]!=null)
		ball[i].update();
	
}



	
var word='';

var bubleBursted=0;

document.addEventListener('keydown',function(e){
	if(e.key.match(/[a-z]/i) && e.key!="Backspace" && e.key!="Enter" && e.key!="SHIFT" && e.key!="Alt")// Shift key
		{
			if(e.shiftKey)
			{	
			var key=e.key.toUpperCase();
			word+=key;
			//para.innerText+=key;
			}	
			else
			{
				var key=e.key;
				word+=key;
				//para.innerText+=key;
				
			}
		}
});
	
document.addEventListener('keyup',function(e){
	var flag=0;
	if(e.keyCode==8 || e.key=="ArrowUp" || e.key=="ArrowDown" || e.key=="ArrowLeft" || e.key=="ArrowRight" || e.key=="Alt")
	{
		errors++;
		return;
	}
	//if(e.keyCode==13)
	//{
		word=word.trim();
		for(var i=0;i<ball.length;i++)
		{
				if( ball[i]!=null && ball[i].word==word)
				{
					ball[i]=null;
                    bubleBursted++;
                    realScore.innerHTML="Score :"+bubleBursted;
					console.log(bubleBursted);
					flag=1;
					word='';
				//	para.innerText="";
				}
		}
		if(word.length==(level+1) && flag===0)
		{	
		word='';
		
		}
//		word='';
//		para.innerText="";
			
		if(bubleBursted==ball.length)
		{
			gameOver();
		}
	//}
		
		
	});
	







	
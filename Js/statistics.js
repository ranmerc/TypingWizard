// Drawer functions

function drawLine(ctx,startX,startY,endX,endY,color)
{
	ctx.save();
	ctx.strokeStyle=color;
	ctx.moveTo(startX,startY);
	ctx.lineTo(endX,endY);
	ctx.stroke();
	ctx.restore();
}

function drawRect(ctx,upperLeftCornerX,upperLeftCornerY,width,height,color)
{
	ctx.save();
	ctx.fillStyle=color;
	ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
	ctx.restore();
}


function drawCircle(ctx,radius,centerX,centerY)
{
	ctx.save();
	ctx.fillStyle="#2D3047";
	ctx.beginPath();
	ctx.arc(centerX,centerY,radius,0,2*Math.PI,false);
	ctx.fill();
	ctx.restore();
}

// end drawer functions


var histogramC=document.getElementById("histogramCanvas");
var lineChartC=document.getElementById('lineChartCanvas');

var histContext=histogramC.getContext('2d');
var lineContext=lineChartC.getContext('2d');

var height=window.innerHeight*0.60;
var width=window.innerWidth*0.80;

histogramC.width=width;
lineChartC.width=width;

histogramC.height=height;
lineChartC.height=height;

histogramC.style.background='#F4F4ED';
lineChartC.style.background='#F4F4ED';

var margin=width*0.05;



var img1=new Image();
img1.src="./Images/triangleUp.jpg";
img1.onload=function(){
histContext.drawImage(img1,margin-8,20,15,15);
lineContext.drawImage(img1,margin-8,20,15,15);
}

var img2=new Image();
img2.src="./Images/rightArrrow.png";
img2.onload=function(){
histContext.drawImage(img2,width-margin+30,height-margin-7,15,15);
lineContext.drawImage(img2,width-margin+30,height-margin-7,15,15);
}


var xhr=new XMLHttpRequest();



xhr.open("POST","Database/fetchData.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send();

var histogramData;
var lineChartData;
xhr.onload=function(){
    var data=JSON.parse(xhr.responseText);
    console.log(xhr.responseText);
    histogramData=data.histogram;
    lineChartData=data.lineChart;


    var count=lineChartData.count;
    var increment=Math.round(  (  (width-margin) -margin)/count);   
    var i;
    var prevH,prevW;
    var lineheight;
    var j=1;
    prevH=height-margin;
    prevW=margin;
    lineContext.fillText(0+"",i,height-5);
    
    lineContext.font="18px Arial";
    lineContext.fillText("Test Number",width*0.45,height-15);
    

    lineContext.save();
    lineContext.translate(20,height*0.5);
    lineContext.rotate(-0.5*Math.PI);
    var rText = 'Error';
    lineContext.fillText(rText , 0, 0);
    lineContext.restore();


   // lineContext.fillText("Error",5,height*0.50);
    lineContext.font="15px Arial";

    var yIncreement=(height-2*margin)/data.lineChart.MAX_ERROR;
    
    lineContext.fillText(data.lineChart.MAX_ERROR,margin*0.5,Math.floor(height-(height-margin)));
    lineContext.fillText(Math.floor(data.lineChart.MAX_ERROR*(3/4)),margin*0.5,Math.floor(height-(height-margin)*3/4));
    lineContext.fillText(Math.floor(data.lineChart.MAX_ERROR/2),margin*0.5,Math.floor(height-(height-margin)/2));
    lineContext.fillText(Math.floor(data.lineChart.MAX_ERROR*(1/4)),margin*0.5,Math.floor(height-(height-margin)*(1/4)));
    
    
    for(i=(margin+10);j<=count;i+=increment)
    {
        if(count<=50)
        lineContext.fillText(j+"",i,height-(margin/2));
        
        lineheight=(lineChartData.lineChartData[j]*yIncreement);
        
        // alert(lineheight);
        drawLine(lineContext,prevW,prevH,i,(height-margin)-lineheight,"#2D3047");
    
	    drawCircle(lineContext,5,i,(height-margin)-lineheight);
        
	    prevH=(height-margin)-lineheight;
        prevW=i;
        j++;
    }

    
    histContext.font="18px Arial";
    histContext.fillText("Test Number",width*0.45,height-15);

    
    histContext.save();
    histContext.translate(20,height*0.5);
    histContext.rotate(-0.5*Math.PI);
    rText = 'WPM';
    histContext.fillText(rText , 0, 0);
    histContext.restore();

    //histContext.fillText("WPM",1,height*0.50);
    histContext.font="15px Arial";
    j=1;
    yIncreement=(height-2*margin)/data.histogram.MAX_WPM;
    
    
    histContext.fillText(Math.floor(data.histogram.MAX_WPM),margin*0.5,Math.floor(height-(height-margin)));
    histContext.fillText(Math.floor(data.histogram.MAX_WPM*(3/4)),margin*0.5,Math.floor(height-(height-margin)*3/4));
    histContext.fillText(Math.floor(data.histogram.MAX_WPM/2),margin*0.5,Math.floor(height-(height-margin)/2));
    histContext.fillText(Math.floor(data.histogram.MAX_WPM*(1/4)),margin*0.5,Math.floor(height-(height-margin)*(1/4)));
    

    //console.log("YIncreement: "+yIncreement);
    var boxheight;
    for(i=margin;j<=count;i+=increment)
    {   
        if(count<=50)
        histContext.fillText(j+"",i+(increment/2),height-(margin/2));

        boxheight=(histogramData.histogramData[j])*yIncreement;
        //console.log("Box height "+Math.floor((height-margin)-boxheight));
        drawRect(histContext,i,(height-margin)-boxheight,increment-1,boxheight,'#2D3047');
        j++;
    }


    
    // X-axis
    drawLine(histContext,margin-10,height-margin,width-margin+30,height-margin,'#020202');
    drawLine(lineContext,margin-10,height-margin,width-margin+30,height-margin,'#020202');

    // Y-axis
    drawLine(histContext,margin,margin-20,margin,height-margin,'#020202');
    drawLine(lineContext,margin,margin-20,margin,height-margin,'#020202');

    
}


var $btn=$(".wrapper .btn");
var oCanvas=document.getElementsByClassName("canvas")[0];
var ctx=oCanvas.getContext("2d");

var w=oCanvas.width;
var h=oCanvas.height;
var spot={};

function init(){
    var img=new Image();
    // 生成随机数，确定抽奖图片
    var probability=Math.random();
    if(probability>0.5){
        img.src= "./img/1.jpg";
    }else{
        img.src= "./img/2.jpg";
    }
    // 图片下载完才执行如下操作
    img.onload=function(){
        oCanvas.style.backgroundImage="url("+img.src+")";
        oCanvas.addEventListener("mousedown",canvasMouseDown);
        // 开辟新路径
        ctx.beginPath();
        ctx.fillStyle="#aaa";
        ctx.fillRect(0,0,w,h);
    }
}
init();
//再来一次
$btn.click(function(){
    ctx.globalCompositeOperation="source-over";
    init();
    
})
function canvasMouseDown(e){
    oCanvas.addEventListener("mousemove",canvasMouseMove);
    document.addEventListener("mouseup",documentMouseUp);
    var x=e.pageX-oCanvas.offsetLeft;
    var y=e.pageY-oCanvas.offsetTop;
    spot.x=x;
    spot.y=y;
    ctx.beginPath();
    // 相交部分被去除
    ctx.globalCompositeOperation="destination-out";
    ctx.arc(x,y,20,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();

}

function canvasMouseMove(e){
    var x=e.pageX-oCanvas.offsetLeft;
    var y=e.pageY-oCanvas.offsetTop;

    ctx.beginPath();
    ctx.moveTo(spot.x,spot.y);
    //  ctx.moveTo用于解决画笔快速移动出现断点
    ctx.lineWidth=40;
    ctx.lineCap="round";
    ctx.lineTo(x,y);
    ctx.stroke();
    spot.x=x;
    spot.y=y;
}


function documentMouseUp(e){
    oCanvas.removeEventListener("mousemove",canvasMouseMove);
    document.removeEventListener("mouseup",documentMouseUp);

    var sum=0;
    // 获取当前canvas的像素信息
    var imgData=ctx.getImageData(0,0,w,h).data;
    for(var i=0;i<imgData.length;i+=4){
        if(imgData[i]==0){
            sum++;
        }
    }
    // 如果超过0.5是空白像素，那么就清除整个矩形
    if(sum>w*h*0.5){
        ctx.clearRect(0,0,w,h);
    }
}
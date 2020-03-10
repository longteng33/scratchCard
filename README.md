# scratchCard
使用canvas制作的刮奖卡  
https://longteng33.github.io/scratchCard  
1、canvas画图的基本步骤  
1）建画布  
2）建画笔  
3）定义画笔样式  
4）定义起点moveTo  
5）lineTo  
6）stroke描边  
7）moveTo  
8）lineTo  
9）stroke  
.....  
2、img.onload=function(){}可使图片下载完成之后再执行某些操作  
3、刮卡的原理。使用ctx.globalCompositeOperation="destination-out" 相交的部分被去除  
4、再来一次的时候，ctx.globalCompositeOperation="source-over"，要使它恢复默认值，否则不能画出灰色蒙版  
5、mousedown的时候添加mousemove和mouseup事件，mouseup的时候再去除mousemove和mouseup事件，这样就不会在没有点击的时候也触发事件  
6、mousemove添加到canvas上，这样只有在canvas中移动鼠标才有刮卡效果  
7、mouseup添加到document上，这样在任意地方都能松开鼠标  
8、快速移动画笔，出现断点的bug，每次移动都将画笔起点移到上一个停留的坐标，再连线lineTo到新的坐标，然后stroke描边  
9、ctx.getImageData(0,0,w,h).data获取当前canvas中的像素信息，每个像素有r、g、b、a四个值，所以隔四个统计一次，当超过50%是空白像素时就清除画板  

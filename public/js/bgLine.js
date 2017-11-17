(function(){
	var canvas=document.getElementById("bgCanvas");
	var w=window.innerWidth,h=$(document).height()-700;
	var cxt=canvas.getContext("2d");
	var num=600;
	var data=[],move={};
	init();
	window.onresize=function(){
		move={};
		data=[];
		init();
	}
function init(){
	canvas.width=w;
	canvas.height=h;

	//����۵��λ���Լ��ٶȵĳ�ʼ��
	for(var i=0;i<num;i++){
		data[i]={x:Math.random()*w,y:Math.random()*h,rx:(Math.random()*0.6-0.3),ry:(Math.random()*0.6-0.3)};
		circle(data[i].x,data[i].y);
	}
}
//�۵���Բ�����
function circle(x,y){
	cxt.save();
	cxt.fillStyle="pink";
	cxt.beginPath();
	cxt.arc(x,y,0.5,Math.PI*2,false);
	cxt.closePath();
	cxt.fill();
	cxt.restore();
}
//�۵��˶�
!function draw(){
	cxt.clearRect(0,0,w,h);
	for(var i=0;i<num;i++){
		data[i].x+=data[i].rx;
		data[i].y+=data[i].ry;
		//���߽�ʱ���ٶ�ȡ�����������˶�
		if(data[i].x>w || data[i].x<0) data[i].rx=-data[i].rx;
		if(data[i].y>h||data[i].y<0) data[i].ry=-data[i].ry;
		circle(data[i].x,data[i].y);
		//����70�ĵ�����
		for(var j=i+1;j<num;j++){
			if(((data[i].x-data[j].x)*(data[i].x-data[j].x)+
			(data[i].y-data[j].y)*(data[i].y-data[j].y))<=70*70){
				line(data[i].x,data[i].y,data[j].x,data[j].y,false);
			}
			//��꾭��ʱ�����������������
			if(move.x){
				if(((data[i].x-move.x)*(data[i].x-move.x)+(data[i].
				y-move.y)*(data[i].y-move.y))<=120*120){
					line(data[i].x,data[i].y,move.x,move.y,true);
				
				}
			}
		}
	}
		window.requestAnimFrame(draw);
	
}();
function line(x1,y1,x2,y2,coCh){
	var color=cxt.createLinearGradient(x1,y1,x2,y2);
	if(coCh){
		color.addColorStop(0,"pink");
		color.addColorStop(0.5,"purple");
		color.addColorStop(1,"red");
	}else{
		color.addColorStop(0,"#9494e6");
		color.addColorStop(0.5,"#4747c7");
		color.addColorStop(1,"blue");
		
	}
	
	cxt.save();
	cxt.strokeStyle=color;
	cxt.beginPath();
	cxt.moveTo(x1,y1);
	cxt.lineTo(x2,y2);
	cxt.stroke();
	cxt.restore();
}
document.onmousemove=function(eve){
	move.x=eve.offsetX;
	move.y=eve.offsetY;	
}

}
)();
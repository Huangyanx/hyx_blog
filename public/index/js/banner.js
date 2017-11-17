(function(){
	var canvas=document.querySelector("#banner .canvas");
	var ce=document.getElementById("ce");
	var w=$(window).width();
	var h=window.innerHeight;
	canvas.width=w;
	canvas.height=h;
	var cxt=canvas.getContext("2d");
	/*������*/
	
	function Moon(x,y){
		this.x=x;

		this.y=y;
		this.move=function(){
			cxt.clearRect(0,0,w,h);
			cxt.save();
			cxt.beginPath();
			cxt.arc(this.x,this.y,50,50,360,false);
			color=cxt.createRadialGradient(this.x,this.y,20,this.x,this.y,50);
			//���ý���Ч��
			color.addColorStop(0,'yellow');//���俪ʼ�����ɫ
			color.addColorStop(1,"#F7C13E");//������������ɫ
			cxt.fillStyle=color;//����������Ƹ���仭��
			cxt.fill();
			cxt.closePath();
			cxt.restore();
			this.x-=0.02,this.y-=0.0001;
			if(x<0) x=w-50;
			if(y<0) x=110;
		}
			
	}

	function Star(){}
		Star.prototype={
			init:function(){
				this.size=Math.ceil(Random(200,10));
				this.outerRad=Math.ceil(Random(5,1));
				this.innerRad=Math.ceil(Random(8,2));
				this.scale=0.5;
				this.scSpe=Random(0.01,0.006);
				this.points=5;
				this.x=Math.ceil(Random(1200,0));
				this.y=Math.ceil(Random(300,0));
				this.speedX=Random(0.5,-0.4);
				this.speedY=Random(0.4,-0.3);
			},
		
			draw:function(){//������
			
				this.smallCan =document.createElement('canvas');
				this.smallCan.width=this.size;
				this.smallCan.height=this.size;
				this.smallCanvas= this.smallCan.getContext('2d');
				var sC=this.smallCanvas;
				sC.save();

				sC.translate(this.size/5,this.size/5);
				sC.translate(-this.size/5,-this.size/5);
				sC.scale(this.scale,this.scale);

				   for (var i=0;i<this.points * 2;i++){
					   var  rotation = i * Math.PI / this.points;
					   var  rad = i % 2 === 0 ? this.outerRad : this.innerRad;
					   sC.lineTo((this.size / 2) + rad * Math.cos(rotation), (this.size / 2) + rad * Math.sin(rotation));
				   }
				   sC.fillStyle="#fff";
				   sC.strokeStyle="#fff"; //�߿���ɫ

					sC.fill()
					sC.stroke();
					// ��������
			
		},
		move:function(){//�����˶�
				if(this.scale<0.99){
					this.scale+=this.scSpe;
					this.smallCanvas.scale(this.scale,this.scale);
				}
				if(this.x<0||this.x>w||this.y<0||this.y>(h/3-60)){
					this.init();
				}else{
					this.x+=this.speedX;
					this.y+=this.speedY;
					cxt.drawImage(this.smallCan,this.x,this.y);//x y ���ǳ��ֵ�λ�ã��������ƶ�����λ��
				}
				
		},
	
	}
	
	
	function Random(max,min){
		return Math.random()*(max-min)+min;
	}
	
	window.requestAnimFrame=(function(){
		return window.requestAnimationFrame||
			window.webkitRequestAnimationFrame||
			window.mozRequestAnimationFrame||
			function(callback){
				window.setTimeout(callback,1000/60);
			};
	})();
	
	
	
	var moon=new Moon(w-60,100);
	var timer=[],star=[];
	var ship=document.querySelector('#river img');
	var s_x=1,s_y=-0.02;
	function run(){
			//�϶���
			var offL=ce.offsetLeft,offT=ce.offsetTop;
			if(Math.abs(offL-moon.x-25+50)<20&&Math.abs(offT-moon.y+70-25)<20) {
				ce.className="zh op";
				setTimeout(function(){
					ce.style.left="-30px";
					ce.style.top="500px";
					ce.className="";
				},8000);
				
			}else{
				//�϶��˶�
                diff=(moon.x-offL+25-50)/(moon.y-offT+25-70);
				var speY=-0.6;
				var speX=speY*diff;
				ce.style.left=offL+speX+"px";
				ce.style.top=offT+speY+"px";
			
			}
			//����
			
			if(ship.offsetLeft>w){
				ship.className="op";
				setTimeout(function(){
					ship.style.left="-50px";
					ship.style.top="50px";
					ship.className='';
				},8000);
			}else{
				ship.style.left=ship.offsetLeft+s_x+'px';
				ship.style.top=ship.offsetTop+s_y+'px';
				
			}
			//�����˶�
			moon.move();
		//�����˶�
		cxt.fillStyle="rgba(88,8,196,0.3)";
		cxt.fillRect(0,0,w,h/3);
		for (var i=0;i<num;i++){
			star[i].move();
		}
		requestAnimFrame(run);
	}
	
		var num=Math.ceil(Random(50,10));
		for (var i=0;i<num;i++){
			star[i]=new Star();
			star[i].init();
			star[i].draw();
		}
		
		run();
	
	
})();
/**
 * Created by Administrator on 2017/9/29.
 */
//���֡��������
window.requestAnimFrame=(function(){
return window.requestAnimationFrame||
		window.webkitRequestAnimationFrame||
		window.mozRequestAnimationFrame||
		function(callback){
			window.setTimeout(callback,1000/60);
		};
})();
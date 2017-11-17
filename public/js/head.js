(function(){
    $(document).ready(function () {
        if ($.cookie("rem")) {
        	var user=$.cookie('rem_use');
            $('.show-login')[0].innerText=user;
            $('.username').val(user);
       }
    });
	$(window).resize(function() {
		$('#head').width($(window).width());
	});

	/*手机端导航的显示隐藏*/
	if($(window).width()<=980){
		$('.ico_le').bind('touchstart',function (e) {
		        $('ul.modular').slideToggle(function () {
		            if ($(this).is(":visible") && !$('#header .contact').is(':hidden')) {
		                $('#header .contact').hide();
		            }
		        });
		        e.preventDefault();
		});
		$('.ico_ri').bind('touchstart',function (e) {
				$('#header .contact').slideToggle(function () {
					if($(this).is(":visible") && !$('ul.modular').is(':hidden')){
						$('ul.modular').hide();
					}
		        });
			e.preventDefault();
		});
		$('.show-login').bind('touchstart',function () {
				$('.login-form').show();
				$('.shade').show();
		});
		$('.show-register').bind('touchstart',function () {
			$('.register-form').show();
			$('.shade').show();
		});
		$('.login-form .close').bind('touchstart',function () {
				$('.login-form').hide();
				$('.shade').hide();
		});
		$('.register-form .close').bind('touchstart',function () {
			$('.register-form').hide();
			$('.shade').hide();
		});

		var $oUp=$('<i></i>');
		$oUp.addClass('iconfont').addClass('icon-jiantoushang');
		$oUp.css({
			'position':'absolute',
			'left':'45%',
			'top':'70px',
			'color':'#00ccff'
		});
		var oUp1=$oUp.clone();
		$('ul.modular').append($oUp);
		$('#header .contact').append(oUp1);
		var rstartY,lstartY;
		$('#header .contact').get(0).addEventListener('touchstart',function (eve) {
			eve.preventDefault();
			var touch = eve.touches[0];
			rstartY=touch.clientY;
        });
		$('ul.modular').get(0).addEventListener('touchstart',function (eve) {
			eve.preventDefault();
			var touch = eve.touches[0];
			lstartY=touch.clientY;
		});

		$('#header .contact').get(0).addEventListener('touchmove',function (eve) {
			var touch = eve.touches[0];
			if(rstartY-touch.clientY>50){
				$(this).hide();
			}

        });
		$('ul.modular').get(0).addEventListener('touchmove',function (eve) {
			var touch = eve.touches[0];
			if(lstartY-touch.clientY>50){
				$(this).hide();
			}
		});
		
	}
	//nav 搜索框显示隐藏
	$(".sear").mouseover(function(){
		$("#searchForm").show();
		$(this).mouseleave(function(){
			$("#searchForm").hide();
		});
	});
	$("#searchForm").mouseover(function(){
			$(this).show();
			$(this).mouseleave(function(){
				$("#searchForm").hide();
			});
	});
	var stairt_indexs=[0];
	$('.plate').each(function (i,ele) {
		var index=i+1;
		stairt_indexs[index]=ele.offsetTop;
	});
	//����ͷ��������ɫ
	var _top=$(window).height();
	var cur_on=0;
	$(window).scroll(function(){
		var scr_top=$(this).scrollTop();
		if(scr_top>_top){
			//ͷ������
			$("#header").css({
				background:'rgba(0,0,0,.6)'
			});
			//�����˵�������ɫ
			$(".secondMenu").css({
				background:'rgba(0,0,0,.6)'
			});
			//
			$("#stairt").css({
				opacity: 1
			});
		}else{
			$("#header").css({
				background:'rgba(23, 56, 154,.6)'
			});
			$(".secondMenu").css({
				background:'rgba(108,108,108,0.1)'
			});
			$("#header .secondMenu a").css({
				color:'#6f6767;'
			});
			$("#stairt").css({
				opacity: 0
			});
		}

		for (var i in stairt_indexs){
			if(Math.abs(scr_top-stairt_indexs[i])<200){
				$("#stairt li").eq(cur_on).removeClass("on");
				cur_on=i;
				$("#stairt li").eq(cur_on).addClass("on");
			}
		}
	});
	//点击定位
	$("#stairt li").bind('click',function(){
			var index=$(this).index();
			$("html,body").animate({
				scrollTop:stairt_indexs[index]+'px',
			});
			$("#stairt li").eq(cur_on).removeClass("on");
			cur_on=index;
			$(this).addClass("on");
	});

	$('.shade').height($(document).height());
	//登陆页面 注册页面显示、隐藏
	$('.show-login').click(function () {
		$('.login-form').show();
		$('.shade').show();
    });
	$('.show-register').click(function () {
			$('.register-form').show();
			$('.shade').show();
	    });
	$('.login-form .close').click(function () {
		$('.login-form').hide();
		$('.shade').hide();
    });
	$('.register-form .close').click(function () {
		$('.register-form').hide();
		$('.shade').hide();
	});
	$('.shade').click(function () {
		$('.login-form').hide();
		$('.register-form').hide();
		$('.shade').hide();
    });
/*---------登陆 注册  表单验证-----------------*/
var login_user,login_pwd,reg_user,reg_pwd,reg_sure_pwd;
$('.reg-user').blur(function () {//注册用户名验证
	user($(this),0);
	if(reg_user){
		var that=$(this).get(0);
		var username=$('.reg-user').val()
		$.get('/has_user',{username},function (rtn) {
			if(rtn.status){/*1为用户名已存在*/
				$(that.nextElementSibling.nextElementSibling).show().text('用户名已存在，请注册其他用户名');
				$(that.nextElementSibling).hide();
				reg_user=false;
			}else{
				$(that.nextElementSibling.nextElementSibling).hide();
				$(that.nextElementSibling).show();
			}
        },'json');
	}
});
$('.reg-pwd').blur(function () {//注册密码验证
	user($(this),2);
});

$('.reg-sure-pwd').blur(function () {//确认密码验证
	var pwd=$('.reg-pwd').val();
	if(pwd!==$(this).val()){
		msg='密码与确认密码不等';
		$($(this).get(0).nextElementSibling.nextElementSibling).show().text(msg);
		$($(this).get(0).nextElementSibling).hide();
	}else{
		reg_sure_pwd=1;
		$($(this).get(0).nextElementSibling.nextElementSibling).hide();
		$($(this).get(0).nextElementSibling).show();
	}
	check_reg();
});
$('.login-user').blur(function () {
	user($(this),1);
});
$('.login-pwd').blur(function () {
	user($(this),3);
});


/*obj为标签; lr :0为注册用户名，1为登录用户名，2为注册密码，3为登录密码*/
function user(obj,lr) {
	var is_true;
	var obj_val=obj.val();
		var msg;
		switch (lr){
			case 0:msg='请输入由汉字、字母、数字组成的6-18长度的用户名';break;
			case 1:msg='请输入由汉字、字母、数字组成的6-18长度的用户名';break;
			case 2:msg='请输入6-18位的数字或字母';break;
			case 3:msg='请输入6-18位的数字或字母';break;
		}
		if(obj_val.length<6||obj_val.length>18){
			switch (lr){
				case 0:reg_user=false;break;
				case 1:login_user=false;break;
				case 2:reg_pwd=false;break;
				case 3:login_pwd=false;break;
			}
				obj.parent().find('p').show().text(msg);
				obj.parent().find('i').hide();
		}else {
			switch (lr){
				case 0:{reg_user=isChinaOrNumbOrLett(obj_val); is_true=reg_user; break;}
				case 1:{login_user=isChinaOrNumbOrLett(obj_val);is_true=login_user; break;}
				case 2:{reg_pwd=isNumberOrLetter(obj_val); is_true=reg_pwd;break;}
				case 3:{login_pwd=isNumberOrLetter(obj_val); is_true=login_pwd;break;}
			}
			if(is_true){
				obj.parent().find('i').show();
				obj.parent().find('p').hide();
			}
			else {
				obj.parent().find('p').show().text(msg);
				obj.parent().find('i').hide();

			}
		}
	check_reg();
	check_log();
}

//监听表单验证是否全通过
function check_reg() {
	if(reg_user&&reg_pwd&&reg_sure_pwd){
		$('.register-form .send').addClass('active').removeClass('disabled');
		return true;
	}
	else{
		$('.register-form .send').removeClass('active').addClass('disabled');
		return false;
	}
}
function check_log() {
	if(login_user&&login_pwd){
		console.log($('.login-form .send'));
		$('.login-form .send').addClass('active').removeClass('disabled');
		return true;
	}else {
		$('.login-form .send').removeClass('active').addClass('disabled');
		return false;
	}

}
	/*jQuery form进行ajax请求，login register*/
	    $('.login-form .send').click(function () {
	    	save();
	    	var check=check_log();
	    	if(check){
				$.get('/login',$('.login-form').serialize(),function (rtn) {
					if(rtn.status){
						alert('登陆成功！');
						$('.show-login').text($('.login-user').val());
						$('.username').val($('.login-user').val());
						$('.login-user').val('');
						$('.login-pwd').val('');
						$('.login-form').hide();
					}else {
						alert('用户名或者密码错误');
					}


                },'json');
			}

        });
		$('.register-form .send').click(function () {
			var check=check_reg();
			if(check){
				$.get('/register',$('.register-form').serialize(),function (rtn) {
					if(rtn.status){
						alert('注册成功，请登录！');
						$('.register-form').hide();
						$('.login-form').show();
						$('.login-user').val($('.reg-user').val());
						$('.login-pwd').val($('.reg-pwd').val());
						$('.reg-user').val('');
						$('.reg-pwd').val('');
						login_user=1;
						login_pwd=1;
						check_log();
					}else{
						alert('注册失败,请重新注册！');
					}
                },'json');
			}
        });
	/*记住用户名密码*/
		function save() {
			if($('#rem_user').prop('checked')==true){
			    var user=$('.login-user').val();
			    var pwd=$('.login-pwd').val();
                $.cookie('rem',1,{expires:14});
                $.cookie('rem_use',user,{expires:14});
                $.cookie('rem_pwd',pwd,{expires:14});
			}else {
                $.cookie('rem',0,{expires:-1});
                $.cookie('rem_use','',{expires:-1});
                $.cookie('rem_pwd','',{expires:-1});
            }

        }


function isChinaOrNumbOrLett( s ){//判断是否是汉字、字母、数字组成
    var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    }else{
        return false;
    }
}

function isNumberOrLetter( s ){//判断是否是数字或字母
    var regu = "^[0-9a-zA-Z]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    }else{
        return false;
    }
}


})();
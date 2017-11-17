/**
 * Created by Administrator on 2017/10/20.
 */
(function () {
    var storage=window.localStorage;
    var ids=$('.id').val();
    ids=ids.split(',');
    var id=ids[0];
    var tab=ids[1];
    var good,tread,th_num;
    var date=JSON.parse(storage.getItem('is_good')) || [];
    console.log(date.length);
    $('.sayGood .good').click(function () {
       var num= $(this).text();
        //本地浏览器存储  ture  为已点赞
        //th_num在第一个位置时，if条件为false
        if(th_num||th_num==0){
            good=date[th_num].good;
        }else {
            store();
        }
        //console.log(is_good);
        if(good==1){
            date[th_num].good=0;
            num=Number(num)-1;
            $(this).text(num);
            $(this).removeClass('icon-thumbsup').addClass('icon-good');
            alert('取消点赞！');
        }else{
            date[th_num].good=1;
            num=Number(num)+1;
            $(this).text(num);//点赞数加1
           //样式改变
            $(this).removeClass('icon-good').addClass('icon-thumbsup');
            alert('点赞成功！');
        }
        storage.setItem('is_good',JSON.stringify(date));
        setDate(1,num);
    });

    $('.sayGood .tread').click(function () {
           var num= $(this).text();
            if(th_num||th_num==0){
                tread=date[th_num].tread;
            }else {
                store();
            }
            if(tread==1){
                date[th_num].tread=0;
                num=Number(num)-1;
                $(this).text(num);
                $(this).removeClass('icon-thumbsdown').addClass('icon-thumbs-down');
                alert('取消踩！');
            }else{
                date[th_num].tread=1;
                num=Number(num)+1;
                $(this).text(num);
                $(this).removeClass('icon-thumbs-down').addClass('icon-thumbsdown');
                alert('踩成功！');
            }
        storage.setItem('is_good',JSON.stringify(date));
          setDate(0,num);

        });
    function store() {
        // is_good=[{id:ids[0],tab:ids[1],good:0,tread:0}];
        console.log(date);
        var date_string={};
        date_string.id=id;
        date_string.tab=tab;
        date_string.good=0;
        date_string.tread=0;
        console.log(date.length);

        if(date.length!=0){
               var length=date.length;
               //console.log(JSON.stringify(date_string));
               for(var i=0;i<length;i++){
                   if(date[i].id==ids[0]&&date[i].tab==ids[1]){
                       th_num=i;
                       good=date[i].good;
                       tread=date[i].tread;
                       console.log(th_num+'已存在');
                       break;
                   }else{
                       th_num=0;
                       date.unshift(date_string);
                       good=0;
                       tread=0;
                       console.log(date_string);
                   }
               }
        } else{
            th_num=0;
            date.unshift(date_string);
            good=0;
            tread=0;
            console.log(date_string);
       }
        storage.setItem('is_good',JSON.stringify(date));

    }
    function setDate(page,num) {
        $.get('/project/hcj_say_good',{id,tab,page,num},function (rtn) {
               console.log(rtn.msg);
        },'json');
    }
    //回复框显示
    $('.req').click(function () {
        var username=$(this).parent().prev().children('h2').text();
        var username_e='<h3>'+username+'回复：</h3>';
        $('#comment').val(username_e).focus();
        var in_use='<input type="hidden" class="tousername" name="tousername" value="'+username
            +'"><input type="hidden" class="comment_id" name="comment_id" value="'+$('.comment_id').val()+'">';
        $('#comment').before(in_use);
        console.log($('.comment_id').val());
        $('body,html').animate({
            scrollTop:'300px'
        },'slow')
    });

//评论提交
    $('#send_comment').click(function () {
        var date=new Date();
                      if($.cookie('rem_use')){
                          $.get('/project/publish_comment',$('.comment-form').serialize(),function (rtn) {
                              if(rtn.status){
                                  alert('评论成功！');
                                 var user=$('.username').val();
                                 var con=$("#comment").val();
                                 var oHtml=` <div class="comment_list">
                                                 <div class="comm_hed">
                                                     <div class="left"><img src="/images/user2.png"></div>
                                                     <div class="left mid">
                                                         <h2>`+user+`</h2>
                                                         <span>`+date+`</span>
                                                     </div>
                                                     <div class="right">
                                                         <span class="req reply" date-show="0">回复</span>
                                                     </div>
                                                 </div>
                                                 <div class="content">`+con+`</div>
                         
                                             </div>`;
                                  $('.comment').append(oHtml);
                                  $("#comment").val('');
                              }

                          },'json');

                      }else{
                          $('.login-form').show();
                          $('.shade').show();
                      }
     });
})();

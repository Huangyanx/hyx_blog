var page=1,page_le=3,start=(page-1)*page_le,page_count=2,has_num=0;
var cache_date=[];
var tabs=['hcj','js'],tab_num=0,tab_len=tabs.length-1;
var date={};
date.start=start;
date.tab=tabs[0];
date.length=page_le;
date.has_num=has_num;

var last_num,has_render;//has_render是否已经完全渲染完
function get_date(opt) {
    /*"/get_date?0=undefined&1=undefined&2=undefined&3=undefined&4=undefined&5=undefined", global: true, type: "get", */
    /*ajax请求传递不了参数过去*/
    var date=opt.date;
    var dates='start='+date.start+'&tab='+date.tab+'&length='+date.length+'&has_num='+date.has_num;
    $.ajax({
         type: 'get',
         url: '/get_date' ,
        data: dates ,
        dataType: 'json',
        success: function (rtn) {
            if(rtn.status){
                opt['callback']&&opt['callback'](rtn);
           }
        }
    });
    if(page<page_count){
            page+=1;
            start=(page-1)*page_le;
            date.start=start;
            console.log(page);
            console.log(page_count+'pages');
    }
}
function render_box(date) {
    $.each(date.date,function (i,val) {
        var oBox=`<div class="cont_box">
            				<a href="/project/hcj_preview?id=`+val.id+`&tab=`+date.tab+`" class="img_box">
            					<img src="/show_img/`+val.img+`">
            				</a>
            				<div class="con">
            				    <h3><a href="/project/hcj_preview?id=`+val.id+`&tab=`+date.tab+`"> `+val.title+`</a></h3>
                                <span>`+val.time+`</span>
                                <i class="iconfont icon-comment">`+val.comment_num+`</i>
                                <i class="iconfont icon-view">`+val.count+`</i>
                                <i class="iconfont icon-good">`+val.good +`</i>
                                <i class="iconfont icon-thumbs-down">`+val.tread +`</i>
            					<div class="content">`+val.content+`</div>
            				</div>
            			</div>`;
             last_num=i;
            $('#content_box').append(oBox);

    });

}
/*第一次渲染*/
get_date({
    date:date,
    callback:function (rtn) {
        window.page_count=rtn.page_count;
        date.has_num=1;
        render_box(rtn);
    }
});

get_date({
    date:date,
    callback:function (rtn) {
        cache_date[page]=rtn;
    }
});

$(document).scroll(function () {
    var h=$(document).height()-100;
    var last_h=$('.cont_box')[last_num].offsetTop+$($('.cont_box')[last_num]).height();
    var top=$(window).scrollTop();
    var dis=top+last_h+40;
    if(page<=page_count&&!has_render){
            if(dis>h){
                if(page==page_count&&tab_num===tab_len) {
                    has_render=true;//已经渲染完
                }
               date.start=start;
               date.length=page_le;
                if(!cache_date[page]){
                    get_date({
                        date:date,
                        callback:function (rtn) {
                            render_box(rtn);
                            cache_date[page]=rtn;
                        }
                    });
                }else {

                    var dates=cache_date[page];
                    render_box(dates);
                }
                if(page<page_count) {
                    get_date({
                        date: date,
                        callback: function (rtn) {
                            cache_date[page] = rtn;
                        }
                    });

                }else {
                    /*下一张表*/
                    if(tab_num<tab_len){
                        tab_num+=1;
                        page=1;
                        date.tab=tabs[tab_num];
                        start=(page-1)*page_le;
                        date.start=start;
                        get_date({
                            date:date,
                            callback:function (rtn) {
                                window.page_count=rtn.page_count;
                                cache_date[page]=rtn;
                            }
                        });
                    }

                }

            }

    }

});

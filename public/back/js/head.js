/**
 * Created by Administrator on 2017/10/10.
 */
(function () {
    //左边导航的高度
    var height=$(document).height();
    $('.nav_left').height(height);


    /*左边  点击   隐藏文字*/
    $('.nav_left .head .ji').click(function () {
    if($(this).hasClass('icon-icon-sidebar-fold')){
        $(this).removeClass('icon-icon-sidebar-fold');
        $(this).addClass('icon-icon-sidebar-unfold');
        $('.nav_left').width('3%');
        $('.cont_right').width('97%');
        $('ul.content li span').removeClass('add').removeClass('redu');
    }else{
        $(this).removeClass('icon-icon-sidebar-unfold');
        $(this).addClass('icon-icon-sidebar-fold');
        $('.nav_left').width('15%');
        $('.cont_right').width('85%');
        $('ul.content li span').addClass('add');
    }

    });

    /*左边  点击+ 显示更多*/

    $('ul.content li span').click(function () {
    if($(this).hasClass('add')){
        $(this).removeClass('add');
        $(this).addClass('redu');
        $(this).parent().next().slideDown('slow');

    }else {
        $(this).removeClass('redu');
        $(this).addClass('add');
        $(this).parent().next().slideUp('slow');
    }
    });
})();

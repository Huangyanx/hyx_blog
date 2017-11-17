(function () {
    //select下一页跳转
    $('#go_page').bind('change',function (ev) {
        var page_go=$(this).val();
        var next_page="/back/project/hcj?page="+page_go;
        window.location.href = next_page;
    })
})();

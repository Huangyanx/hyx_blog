/**
 * Created by Administrator on 2017/10/11.
 */
(function () {
    //全选、反选
    $('#check_all').click(function () {
            if($(this).prop("checked")){
                $('td input.check').each(function () {
                   $(this).prop("checked",true);
               });
            }else{
                $('td input.check').each(function () {
                   $(this).prop("checked", false);
               });
            }
    })
})();
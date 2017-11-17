(function () {
    //单个删除
    $('.delete').click(function () {
        var sure=confirm('确定删除吗？');
        if(sure){
            var id='('+ $(this).data('value')+')';
            detete_row(id,this);
        }

    });

    //大量删除
    $('.dele_all').click(function () {
        var sure=confirm("确定删除吗？");
        if(sure){
            var check=$('table td .check');
                var ids='(';
                var lianjie=''
                check.each(function (i,ele) {
                    if(ele.checked){
                       ids+=lianjie+$(ele).val();
                       lianjie=','
                    }
                });
                ids+=')';
            console.log(ids);
            detete_row(ids,check);

        }

    })

    function detete_row(id,ele) {

        $.get('/back/project/hcj_delete',{id},function (rtn) {
           if(rtn.status){
               if(ele.length){
                   ele.each(function (i,ele) {
                      if(ele.checked){
                          $(this).parent().parent().remove();
                      }
                  });
               }else{
                   $(ele).parent().parent().remove();
               }

               alert('删除成功');

           }else{
               alert('删除失败！');
           }
       },'json');

    }
})();
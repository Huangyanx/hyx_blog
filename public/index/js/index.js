/**
 * Created by Administrator on 2017/10/21.
 */

(function () {
    //超出隐藏（文章）
    ellipsis( $('.show .content'),110);
    function ellipsis( obj , length ){
      var str = '';
      obj.each(function(){
          var strs=$(this).text().replace(/\s/g,'');
        if( strs.length > length ){
          str = strs.substring(0 , length) + '…';
        }else{
            str= strs;
        }
          $(this).text( str );
      });
    }


})();

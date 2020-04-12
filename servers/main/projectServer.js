exports.main_list=(req,res,next)=>{
    //project的hcj 列表
    var sql3 ="select * from hcj ORDER BY time DESC limit 0,8";
    var hcj_list=[];
    var conn3=db.connection.query(sql3);
    conn3.on('result',function (row) {
        hcj_list.push(row);
        var arr=row.time.split('.');
        row.datetime=arr[0];
    });

    conn3.on('end',function () {
        var sql4 ="select * from bump ORDER BY time DESC limit 0,8";
        var bump_list=[];
        var conn4=db.connection.query(sql4);
        conn4.on('result',function (row1) {
            bump_list.push(row1);
            var arr=row1.time.split('.');
            row1.datetime=arr[0];
        });
        conn4.on('end',function () {
            res.render('main/index',{hcj_list,bump_list});
        });
    });

}

exports.hcj_preview=(req,res,next)=>{
    var tab=req.query.tab;
    var id=req.query.id;
    /*comment 表*/
    var sql4='select * from comment where art_id=?';
    var conn4=db.connection.query(sql4,[id]);
    var comment=[],comm;
    conn4.on('result',function (row) {
          comment.push(row);
    });
    conn4.on('error',function (err) {
        console.log(err);
    });
    conn4.on('end',function () {
        comm=comment
    });

        /*hcj表*/
       var sql='select * from '+tab+' where id="'+id+'"';
          db.connection.query(sql,function (error,results,fieds) {
              if(error) {
                  throw error;
              }
              else{
                  //浏览次数数据库更新
                  count=results[0].count+1;
                  console.log(count);
                  var sql1="update "+tab+" set count='"+count+"' where id='"+id+"'";
                  db.connection.query(sql1,function (error,results,fieds) {
                      if(error) throw error;
                  });
                   //下一个作品
                  var next;
                  var is_next;
                  var sql3='select id,title from '+tab+' where id > '+id +' limit 1';
                  db.connection.query(sql3,nextF);
                  function nextF(error,ne,fieds){
                       if (error) throw error;
                           /*next当值为[]时，在hcj预览页面在if条件下不起作用，只作一般字符串*/
                           //console.log(ne);
                           if(ne.length!=0){
                               is_next=1;
                           }else{
                               is_next=false;
                           }
                       next=ne;
                    }
                  //最近作品
                  var type_id=results[0].type_id;
                  var sql2='select id,title from '+tab+' where type_id="'+type_id+'" ORDER BY time DESC limit 0,10';
                  db.connection.query(sql2,function (error,hot,fieds) {
                      if(error) throw error;
                          res.render('main/project/hcj_preview',{count,hcj:results,is_next,next,hot,tab:'hcj',comm,tab});
                  });


              }
          });
}

exports.hcj_say_good=(req,res,next)=>{
    if(req.query.page){
        var field='good';
    }else {
        var field='tread';
    }
    var num=req.query.num;
    var id=req.query.id;
    var tab=req.query.tab;
    var sql='update '+tab+' set '+field+' = ? where id= ?';
    db.connection.query(sql,[num,id],function (err,result,fields) {
        if(err) {
            throw err;
            var status=0;
            var msg='点赞失败！';
        }else{
            var status=1;
            var msg='点赞成功！';
        }
        res.json({status,msg});
    });

}
exports.publish_comment=(req,res,next)=>{
   var send=req.query;
   var tab=send.tab;
   var module_id=send.module_id;
   var type_id=send.type_id;
   var art_id=send.art_id;
   var username=send.username;
   var content=send.conent;
   var comment_num=Number(send.comment_num)+1;
   var date=new Date();
   var tousername=send.tousername;
   var comment_id=send.comment_id;
    /*hcj表*/
    var sql1="update "+tab+" set comment_num= ? where id=?";
    var conn1= db.connection.query(sql1,[comment_num,art_id]);
    if(tousername){
           var sql3='select content,touser from comment where id=?';
           console.log(sql3);
           var conn3=db.connection.query(sql3,[comment_id]);
           var sql4='update comment set content=?, touser=? where id=?';
            conn3.on('error',function (row) {
                console.log(row);
            });
           conn3.on('result',function (row) {
               var content_o=row['content'];
               var tousername_o=row['touser'];
               content_o+=content;
               tousername_o===null?tousername_o=tousername:tousername_o+=','+tousername;
               console.log(row);
               console.log(content_o);
               console.log(tousername_o);
               db.connection.query(sql4,[content_o,tousername_o,comment_id],function (err,result,fileds) {
                   console.log(result);
                   if(err){
                       throw err;
                       res.json({'status':0});
                   }else {
                       res.json({'status':1});
                   }
               });

           });
    }else {
        /*comment 表*/
            var sql2="insert into comment (module_id,type_id,art_id,username,date,content) values (?,?,?,?,?,?)";
            var conn2= db.connection.query(sql2,[module_id,type_id,art_id,username,date,content]);

            conn1.on('result',function (row) {
                conn2.on('result',function (row1) {
                    if(row&&row1){
                        res.json({'status':1});
                    }
                });
            });
    }



}

exports.article_preview=(req,res,next)=>{
    var tab=req.query.tab ? req.query.tab:'bump';
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
                res.render('main/artcle/hcj_preview',{count,hcj:results,is_next,next,hot,tab:'hcj',comm,tab});
            });


        }
    });
}
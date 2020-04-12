var fs=require('fs');

//项目hcj列表
exports.hcjList=(req,res,next)=>{
    var tab=req.query.tab;
    var page=req.query.page;
    //总记录数
    var sql1='select count(*) as count from '+tab;
    var countF=db.connection.query(sql1);
    countF.on('result',function (row) {
        var counts=row.count;
        if(page>counts||page<0||!page) page=1;
        var page_num=7;//每页条数
        var page_count=Math.ceil(counts/page_num);//总页数
        var page_pre=page-1;
        var page_next=Number(page)+1;
        var page_start=page_pre*page_num;//当前页的第一条   开始
        var sql='select * from '+tab+' limit '+page_start+','+page_num;
           db.connection.query(sql,function (error,results,fieds) {
               if(error) {
                   throw error;
               }
               else{
                   res.render('back/project/'+tab,{page_count,page,page_pre,page_next,hcj_list:results});
               }
           });
    });

}
//添加hcj项目处理
exports.hcjDo=(req,res,next)=>{
    var tab=req.body.tab;
    console.log(req.body);
    console.log(req.files);
    var project_type=req.body.project_type;
    var title=req.body.title;
    var content=req.body.content;
    var time=new Date();
    console.log(content);
    //上传图片
    var img_name=req.files.upimage.name;
    if(!img_name){img_name="02.jpg";}
    var tmp_img=req.files.upimage.path;
    if(tmp_img){
        var target_img='./public/show_img/'+img_name;
        fs.rename(tmp_img,target_img,function (err) {
            if(err) throw err;
        });
    }

    //上传预览代码
    if(req.files.upcode){
        if(req.files.upcode.name){
            var pro_name=req.files.upcode.name;
       }else{
            var pro_name=req.body.codename;
       }
        var tmp_path= req.files.upcode.path; // 获得文件的临时路径
        if(req.files.upcode.name){
            var target_path = './views/show/'+ pro_name;
            // 指定文件上传后的目录 。
            fs.rename(tmp_path,target_path,function (err) {
                if(err) throw err;
            })
        }

    }else{
        var pro_name=null;
    }

    //在hcj表添加一列
    var sql="insert into "+tab+" (img,preview,title,content,time,project_type) values (?,?,?,?,?,?)";
    var arr2=[img_name,pro_name,title,content,time,project_type];
   // console.log(sql);
    db.connection.query(sql,arr2,function (error,results,fieds) {
       if(error) {
           throw error;
       }
       else{
           res.redirect(302,'/back/project/hcj?tab='+tab);
       }

    });

}
//hcj编辑页面
exports.hcj_editor_ori=(req,res,next)=>{
    var tab=req.query.tab;
    var id=req.query.id;
    var sql='select * from '+tab+' where id="'+id+'"';

       db.connection.query(sql,function (error,results,fieds) {
           if(error) {
               throw error;
           }
           else{
              // console.log(results);
               res.render('back/project/'+tab+'_editor',{hcj:results});
           }
       });
}
//hcj编辑页面处理
exports.hcjEditorDo=(req,res,next)=>{
    var tab=req.body.tab;
    var id=req.body.id;
    var project_type=req.body.project_type;
    var title=req.body.title;
    var content=req.body.content;
    var time=new Date();
    //上传图片
    if(req.files.upimage.size!=0){
        var img_name=req.files.upimage.name;
        var tmp_img=req.files.upimage.path;
        var target_img='./public/show_img/'+img_name;
        fs.rename(tmp_img,target_img,function (err) {
            if(err) throw err;
        });
    }else {
        var img_name=req.body.up_image;
    }

       if(req.files.upcode.size!=0){
                   console.log(req.files.upcode);
                   if(req.body.codename){
                       var types=req.files.upcode.name.split('.');
                       var pro_name=req.body.codename+'.'+types[1];
                   }else{
                       console.log(req.files.upcode);
                       var pro_name=req.files.upcode.name;
                   }
                   var tmp_path= req.files.upcode.path; // 获得文件的临时路径
                   var target_path = './views/show/'+ pro_name;
                       // 指定文件上传后的目录 。
                       fs.rename(tmp_path,target_path,function (err) {
                           if(err) throw err;
                           //删除临时文件
                           /*fs.unlink(tmp_path,function (err) {
                               if(err) throw err;
                           })*/
                       })

       }else{
           var pro_name = req.body.up_code;
       }
        var sql="update  "+tab+" set img=?,preview=?,title=?,content=?,time=?,project_type=?  where id=?";
        var arr=[img_name,pro_name,title,content,time,project_type,id]
       db.connection.query(sql,arr,function (error,results,fieds) {
          if(error) {
              throw error;
          }
          else{
              res.redirect(302,'/back/project/hcj?tab='+tab);
          }

       });
}
//hcj预览页面
exports.hcj_preview=(req,res,next)=>{
    var tab=req.query.tab ? req.query.tab:'hcj';
    var id=req.query.id;
    var sql='select * from '+tab+' where id="'+id+'"';
       db.connection.query(sql,function (error,results,fieds) {
           if(error) {
               throw error;
           }
           else{
             var comment=results[0].comment;
               if(comment){
                   var comm_count=comment.length;
                   var count=0
                    for(var i=0;i<comm_count;i++){
                        count+= comment.time.length;
                    }
               }
               //浏览次数
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
                        console.log(ne);
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

                   res.render('back/project/'+tab+'_preview',{addr:'back_hcj_preview.html',count,hcj:results,is_next,next,hot});
               });


           }
       });
}

//hcj删除处理
exports.hcj_delete=(req,res,next)=>{
    var id=req.query.id;
    var sql="delete from hcj where id in "+id;
    db.connection.query(sql,function (err,result,fieds) {
        if(err) {
            throw err;
            var status=0;
        }else{
            var status=1;
        }
        res.json({'status':status});
    });
}


/**
 * Created by Administrator on 2017/10/21.
 */
var md5=require('md5');
exports.login=(req,res,next)=>{
    var username=req.query.username;
    var pwd=md5(req.query.pwd);
    var sql='select username from user where username=? and pwd=? ';
    db.connection.query(sql,[username,pwd],function (err,result,fileds) {
        if(err) throw err;
        if(result.length){
            req.session.user_info = username
            req.session.save();  //保存一下修改后的Session
           var status=1;
        }else {
            var status=0;
        }
        res.json({'status':status});
    });
}
exports.register=(req,res,next)=>{
    var username=req.query.username;
    console.log(md5(1111));
    var pwd=md5(req.query.pwd);
    var sql='insert into user (username,pwd) values (?,?)';
    db.connection.query(sql,[username,pwd],function (err,result,fileds) {
        if(err) throw err;
        res.json({'status':1});
    });
}
/*判断用户名是否存在*/
exports.has_user=(req,res,next)=>{
    var username=req.query.username;
    var sql='select  username from user where username = ? ';
    db.connection.query(sql,[username],function (err,result,fileds) {
        if(err) throw err;
        if(result.length){
            var status=1;
        }else{
            var status=0;
        }
        res.json({status});
    });
}
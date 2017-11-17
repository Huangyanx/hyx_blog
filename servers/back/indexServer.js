var md5=require('md5');
exports.register_do=(req,res,next)=>{
    var username=req.query.username;
    var pwd=md5(req.query.pwd);
    var sql='insert into user (username,pwd,is_admin) values (?,?,?)';
    db.connection.query(sql,[username,pwd,1],function (err,result,fileds) {
        if(err) throw err;
        if(result.length){
            res.render('/back/login');
        }else {
            res.render('back/register');
        }

    });
}

exports.login_do=(req,res,next)=>{
    var username=req.query.username;
    var pwd=md5(req.query.pwd);
    var sql='select username from user where username=? and pwd=? and is_admin=?';
    db.connection.query(sql,[username,pwd,1],function (err,result,fileds) {
        if(err) throw err;
        if(result.length){
           req.session.user_info=username;
            res.redirect('/back/project/hcj?tab=hcj');
        }else {
            res.render('/user/login');
        }

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
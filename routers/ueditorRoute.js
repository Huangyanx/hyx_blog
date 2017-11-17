/**
 * Created by Administrator on 2017/10/15.
 */
var router=express.Router();
//加载ueditor 模块

var ueditor = require("ueditor");
var path = require('path');

router.get('/',ueditor(path.join(rootPath, 'public'), function(req, res, next) {
    console.log(req.query.action+"get");
    console.log(req.ueditor);
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;
        var img_url = '/upload/images/';
        var goalDirPath = path.resolve(img_url);
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/upload/images/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    //文件上传
    else  if (req.query.action === 'uploadfile') {
            var foo = req.ueditor;
            console.log(req);
            var date = new Date();
            var filename = req.ueditor.filename;
            var img_url = '/upload/files/';
            var goalDirPath = path.resolve(img_url);
            res.ue_up(filename);
        }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


router.post('/',ueditor(path.join(rootPath, 'public'), function(req, res, next) {
    console.log(req.query.action+"get");
    console.log(req.ueditor);
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;
        var img_url = '/upload/images/';
        var goalDirPath = path.resolve(img_url);
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/upload/images/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    else  if (req.query.action === 'uploadfile') {
        var foo = req.ueditor;
        var date = new Date();
        var filename = req.ueditor.filename;
        var img_url = '/upload/files/';
        var goalDirPath = path.resolve(img_url);
        res.ue_up(filename);
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


module.exports=router;

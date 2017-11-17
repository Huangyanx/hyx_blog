global.rootPath=__dirname;
global.db=require('./model/db');
global.http=require('http');
global.express=require('express');

var multipart = require('connect-multiparty');
var session=require('express-session');
//var cookieParser = require('cookie-parser');
var ejs=require('ejs');
var bodyParser=require('body-parser');
var app=express();
//app.use(cookieParser());
app.use(session({
	resave: true,  // 新增
	saveUninitialized: true,  // 新增
	secret: 'hubwiz app',
}));
//app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//设置上传文件的临时存储目录
app.use(multipart({uploadDir:'./public/upload', keepExtensions:true}));

//模板引擎
app.set('view engine','html');
app.set('views',rootPath+'/views');
app.engine('.html',ejs.__express);

//设置静态文件目录

app.use(express.static(rootPath+'/public'));

//处理插件ueditor
app.use("/ueditor/ue",require(rootPath+'/routers/ueditorRoute'));
app.use('/show',require(rootPath+'/routers/showRoute'));
app.use('/user',require(rootPath+'/routers/userRoute'));
app.use('/',require(rootPath+'/routers/mainRoute'));

/*后台需登录才能进入*/
var auth = require(rootPath+'/middlewares/auth');
app.use(auth.authUser);
app.use('/back',require(rootPath+'/routers/backRoute'));


/*捕获错误*/
app.use(function(req,res,next){
	var err=new Error('非常抱歉，因为网站服务器升级，导致本页面暂时无法访问');
	err.status = 404;
	next(err);

});

if (app.get('env')==='development') {
	app.use(function(err,req,res,next){
		res.status(err.status||500);
		res.render('error',{
			message:err.message,
			error:err,
			title:'错误信息提示页面'
		})

	})
}

app.listen(3000, function() {
    console.log('app listen : 3000');
});
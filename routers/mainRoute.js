var router=express.Router();
var projectServer=require(rootPath+"/servers/main/projectServer");
var aboutMeServer=require(rootPath+"/servers/main/aboutMeServer");
var articleServer=require(rootPath+"/servers/main/articleServer");
var bookServer=require(rootPath+"/servers/main/bookServer");
var noteServer=require(rootPath+"/servers/main/noteServer");
var indexServer=require(rootPath+"/servers/main/indexServer");
var userServer=require(rootPath+"/servers/main/userServer");

router.get('/get_date',indexServer.get_dates);

router.get('/project/hcj_preview',projectServer.hcj_preview);
router.get('/project/publish_comment',projectServer.publish_comment);

router.get('/project/hcj_preview',projectServer.hcj_preview);

router.get('/login',userServer.login);
router.get('/register',userServer.register);
router.get('/has_user',userServer.has_user);

router.get('/project',function (req,res) {
	res.render('main/project/project');
});
router.get('/artcle',function (req,res) {
	res.render('main/artcle/artcle');
});
router.get('/note',function (req,res) {
	res.render('main/note/note');
});
router.get('/book',function (req,res) {
	res.render('main/book/book');
});
router.get('/aboutMe',function (req,res) {
	res.render('main/aboutMe/aboutMe');
});

router.get('/project/hcj_bz',function (req,res) {
	res.render('main/project/hcj_bz');
});

router.get('/node',function (req,res) {
	res.render('main/project/node');
});

router.get('/aboutMe/resume',function (req,res) {
	res.render('main/aboutMe/resume');
});


router.get('/',projectServer.main_list);
module.exports=router;
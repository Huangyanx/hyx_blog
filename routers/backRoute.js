var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router=express.Router();
var projectServer=require(rootPath+"/servers/back/projectServer");
var aboutMeServer=require(rootPath+"/servers/back/aboutMeServer");
var articleServer=require(rootPath+"/servers/back/articleServer");
var bookServer=require(rootPath+"/servers/back/bookServer");
var noteServer=require(rootPath+"/servers/back/noteServer");
var indexServer=require(rootPath+"/servers/back/indexServer");
router.get('/',function(req,res,next){
	res.render("back/index");
});

/*project*/
router.get('/project',function (req,res,next) {
	res.render('back/project/index');
});
router.get('/project/hcj_add',function (req,res,next) {
	res.render('back/project/hcj_add');
});
router.get('/project/hcj_editor',projectServer.hcj_editor_ori);
router.get('/project/hcj_preview',projectServer.hcj_preview);
router.get('/project/hcj_delete',projectServer.hcj_delete);
//router.post('/project/hcj_delete',projectServer.hcj_delete_all);

router.get('/project/hcj',projectServer.hcjList);
router.post('/project/hcj_add_do',multipartMiddleware,projectServer.hcjDo);
router.post('/project/hcj_editor_do',multipartMiddleware,projectServer.hcjEditorDo);

/*js*/
router.get('/project/js_add',function (req,res,next) {
	res.render('back/project/js_add');
});

/*artcle*/
router.get('/artcle/',articleServer.article);
router.get('/artcle/bump_add',function (req,res,next) {
	res.render('back/artcle/bump_add');
});
router.get('/artcle/bump_editor',articleServer.bump_editor_ori);
router.get('/artcle/bump_preview',articleServer.bump_preview);
router.get('/artcle/bump_delete',articleServer.bump_delete);

router.get('/artcle/bump',articleServer.bumpList);
router.post('/artcle/bump_add_do',multipartMiddleware,articleServer.bumpDo);
router.post('/artcle/bump_editor_do',multipartMiddleware,articleServer.bumpEditorDo);

module.exports=router;
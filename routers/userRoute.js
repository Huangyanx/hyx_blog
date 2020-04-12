var router=express.Router();
var indexServer=require(rootPath+"/servers/back/indexServer");
router.get('/login',function (req,res,next) {
	res.render('back/login');
});
router.get('/register',function (req,res,next) {
	res.render('back/register');
});
router.get('/login_do',indexServer.login_do);
router.get('/register_do',indexServer.register_do);
router.get('/has_user',indexServer.has_user);


module.exports=router;
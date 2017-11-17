/**
 * Created by Administrator on 2017/10/18.
 */
//作品展示页面
var router=express.Router();
router.get('/',function(req,res){
    var page=req.query.page;
    //console.log(page);
	res.render('show/'+page);
});
module.exports=router;
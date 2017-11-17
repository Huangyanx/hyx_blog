// 验证用户是否登录
exports.authUser = function (req, res, next) {
    console.log('是否已登录');
  res.locals.current_user = null;;
  res.locals.title_str='博客欢迎你.';
  if (req.session.user_info) {
        user = res.locals.current_user = req.session.user_info ;
  		next();
  } else{
      res.redirect('/user/login');
  }
};

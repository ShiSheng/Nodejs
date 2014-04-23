var express = require('express');
var router = express.Router();


var models = require('../models/user');

var User = models.User;

var crypto = require('crypto');




//登录页面
//router.get('/login',checkLogin);
router.get('/login', function(req, res) {
	res.render('user/login',{"title":"用户登录"});
});
//退出登录
//router.get('/logiout',checkNotLogin);
router.get('/logout', function(req, res) {
	req.session.user = null;
	res.redirect('/');
});
//登录提交
router.post('/login', function(req, res) {
	var md5 = crypto.createHash('md5'),
		pwd = md5.update(req.body.password).digest('hex');
	var user = {
		name:req.body.name,
		password:pwd
	}
	User.findOne(user,function(err,doc){
		if(doc){
			req.session.user = doc;
  			res.json({"error":false,"msg":"登录成功","href":"/"});
		}else{
  			res.json({"error":true,"msg":"用户名或密码错误"});
  		}
	});
});
//注册页面
router.get('/register', function(req, res) {
  res.render('user/register',{"title":"用户注册"});
});
//注册提交
router.post('/register', function(req, res) {
  var name = req.body.name;
  var pwd = req.body.password;
  var repwd = req.body.repassword;
  if(pwd != repwd){
  	res.json({"error":true,"msg":"两次密码输入不一致"});
  }else{
  	var md5 = crypto.createHash('md5'),
  	pwd =  md5.update(req.body.password).digest('hex');
  	User.findOne({"name":name},function(err,doc){
	  	if(doc){
  			res.json({"error":true,"msg":"用户名已存在"});
	  	}else{
			new User({
				email:req.body.email,
				name:name,
				password:pwd
			}).save();
  			res.json({"error":false,"msg":"注册成功","href":"/users/userlist"});
	  	}
	  });
  	
	//res.redirect('/users/userlist');
  }
});
//用户列表
router.get('/userlist', function(req, res) {
	User.find(function(err,doc){
		res.render('user/userlist',{"title":"用户列表","data":doc});
	});
});
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;

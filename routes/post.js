var express = require('express');
var router = express.Router();


var models = require('../models/post');

var Post = models.Post;
var modelsUser = require('../models/user');

var User = modelsUser.User;




 
//发表文章页面
router.get('/add', function(req, res) {
	res.render('post/add',{"title":"用户登录","user":req.session.user});
});
router.post('/add', function(req, res) {
	var date = new Date();
	var time ={
		date:date,
		year:date.getFullYear(),
		month:date.getMonth()+1,
		day:date.getDate(),
		minute:date.getHours()+":"+(date.getMinutes()<10?0+date.getMinutes:date.getMinutes()),
		ym:date.getFullYear() +"-"+ (date.getMonth()+1),
		ymd:date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
		ymdm:date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
	}
	new Post({
		username : req.session.user.name,
		title : req.body.title,
		content : req.body.content,
		time :time 
	}).save(function(err,doc){
		User.update({"name":req.session.user.name},{$push:{"post":doc}},function(){
		});
	});
	//res.render('get/'+req.session.user.name,{"title":req.session.user.name+"的文章列表","msg":"发表成功"})
  	res.json({"error":false,"msg":"发表成功","href":"get/"+req.session.user.name});
});
//获取某一用户的所有文章
router.get('/get/:name',function(req,res){
	Post.find({username:req.param('name')},function(err,doc){
		res.render('post/postOne',{
			"title":req.session.user.name+"的文章列表",
			"postlist":doc,
			"user":req.session.user
		});
	});
});
router.get('/', function(req, res) {
	Post.find(function(err,doc){
		res.render('user/postlist',{"title":"文章列表","data":doc});
	});
});

module.exports = router;

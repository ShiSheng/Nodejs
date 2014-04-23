var express = require('express');
var router = express.Router();

var modelsUser = require('../models/user');
var modelsChat = require('../models/chat');

var Chat = modelsChat.Chat;
var User = modelsUser.User;


router.get('/index', function(req, res) {
	res.render('chat/index',{
		"title":"聊天室",
		"user":req.session.user
	});
});

router.use = function(io){
var userList = {}; 
	io.sockets.on('connection', function (socket) {
		//进入在线
		socket.on('online',function(data){
			socket.name = data.user;
			User.findOne({"name":data.user},function(err,doc){
				if(!userList[data.user]){
					userList[data.user] = doc;
				}
				io.sockets.emit('online',{"userList":userList,"user":data.user});
			});
		});

		//发送消息
		socket.on('message', function (msg) {
		    socket.broadcast.emit('message', msg);
		});

		//离开
		socket.on('disconnect',function(){
			if(userList[socket.name]){
				delete userList[socket.name];
			}
			io.sockets.emit('offline',{"userList":userList,"user":socket.name});
		});
		
	});
}
module.exports = router;

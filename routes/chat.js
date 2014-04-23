var express = require('express');
var router = express.Router();

var models = require('../models/user');

var Chat = models.Chat;
var User = models.User;


router.get('/index', function(req, res) {
	User.find(function(err,doc){
		res.render('chat/index',{
			"title":"聊天室",
			"users":doc,
			"user":req.session.user
		});
	});
});
router.use = function(io){
	io.sockets.on('connection', function (socket) {
		socket.on('message', function (msg) {
		    console.log('11111Message Received: ', msg);
		    socket.broadcast.emit('message', msg);
		});
	});
}
module.exports = router;

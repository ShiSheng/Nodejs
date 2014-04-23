var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User Schema
var _Chat = new Schema({
    content:String,
    User:Object
});

var userList = [];
exports.User = mongoose.model('Chat',_Chat);
exports.userList = userList;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User Schema
var _User = new Schema({
    email:String,
    name:String,
    password:String
});

exports.User = mongoose.model('User',_User);
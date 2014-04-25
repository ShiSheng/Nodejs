var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Post Schema
var _Post = new Schema({
    username:String,
    title:String,
    content:String,
    time:Object
});

exports.Post = mongoose.model('Post',_Post);
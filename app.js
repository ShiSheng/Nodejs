var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser'); 
// 数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://crow2:q125759748@oceanic.mongohq.com:10017/Crow');
// 数据库
//var sessionStorage = require('./models/sessionStorage');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({ 
    secret: 'keyboard cat', 
    key: 'sid', 
    cookie: { secure: false }
}));

var http = require('http');
var server = http.createServer(app);
var socketio = require('socket.io');
var io =socketio.listen(server);
server.listen(process.env.PORT || 1111,function(){
    console.log('express server listening on port :'+1111)
})


app.use(function(req, res, next) {
    var url = req.originalUrl;
    //没登录只能去这些页面
    if(url!="/users/login" && url!="/users/register"  && url!="/" && !req.session.user){
        return res.redirect("/users/login");
    //登录了不能去注册页面
    }else if((url=="/users/register" || url=="/users/login") && req.session.user){
        return res.redirect("/");
    //其他随意
    }else{
        next();
    }
});
var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

chat.use(io);
app.use('/', routes);
app.use('/users', users);
app.use('/chat', chat);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//app.listen(1111);
module.exports = app;

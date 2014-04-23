var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(res.locals.error)
  res.render('index', { 'title': 'Express','user':req.session.user,'error':res.locals.error});
});

module.exports = router;

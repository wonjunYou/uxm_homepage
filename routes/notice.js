var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('notice',{title:"Notice"});
  });

router.get('/show/:id', function(req, res, next) {
  res.render('notice_show');
});

router.get('/write',function(req, res, next) {
  res.render('notice_write');
});
  
module.exports = router;

var express = require('express');
var router = express.Router();

var Notice = require('../models/notice');

router.get('/', function(req, res, next) {
  Notice.find({},function (err, notice){  
  res.render('notice',{title:"Notice",notice:notice});
  });
});

router.get('/show/:id', function(req, res, next) {
  Notice.findOne({_id:req.params.id}, function(err, notice){
    res.render('notice_show',{notice:notice});
  });
});

router.get('/write',function(req, res, next) {
  res.render('notice_write');
});

router.post('/notice/write',function(req, res){
  var notice= new Notice();
  notice.title = req.body.title;
  notice.content = req.body.content;
  notice.date = Date.now();
  notice.writer = "관리자";
  notice.save(function(err){
    if(err){
      console.log(err);
      res.redirect('/notice');
    }
    res.redirect('/show/'+req.body.id);
  });
});

router.get('/edit/:id',function(req,res){
  Notice.findOneAndReplace({_id:req.params.id},function(err, notice){
    res.render('notice_write',{notice:notice});
  });
});

module.exports = router;
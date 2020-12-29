var express = require('express');
const notice = require('../models/notice');
var router = express.Router();

var Notice = require('../models/notice');

router.get('/', function(req, res, next) {
	Notice.find({},function (err, notice){  
		res.render('notice',{title:"Notice",notice:notice, page:-1});
		});
  });

router.get('/page/:page', function(req, res, next) {
  var page = req.params.page;
  Notice.find({},function (err, notice){  
  res.render('notice',{title:"Notice",notice:notice,page:page});
  });
});

router.get('/show/:id', function (req, res, next) {
	Notice.findOne({ _id: req.params.id }, function (err, notice) {
		res.render('notice_show', { notice: notice });
		notice.views++;
		notice.save();
	});
});

router.get('/write', function (req, res, next) {
	res.render('notice_write');
});

router.post('/notice/write',function(req, res){
  var notice= new Notice();
  notice.title = req.body.title;
  notice.content = req.body.content;
  notice.date = Date.now();
  notice.writer = "관리자";
  notice.views = req.body.views;
//   notice.attachment = req.body.attachment;
  notice.save(function(err){
	if(err){
      console.log(err);
    }
    res.redirect('/notice');
  });
});

router.get('/edit/:id', function (req, res) {
	Notice.findOne({ _id: req.params.id }, function (err, notice) {
		if (err) return res.json(err);
		res.render('notice_update', { notice: notice });
	});
});

router.post('/edit/:id', function (req, res) {
	Notice.updateOne(
		{ _id: req.params.id },
		{ $set: req.body },
		function (err, notice) {
			if (err) return res.json(err);
			res.redirect('/notice');
		}
	);
});
router.get('/delete/:id', function (req, res) {
	Notice.deleteOne({ _id: req.params.id }, function (err, notice) {
		if (err) return res.json(err);
		res.redirect('/notice');
	});
});
// router.get('/:url', function (req, res) {
// 	const file = `${__dirname}/../public/uploads/${req.params.url}`;
// 	res.download(file);
// });
module.exports = router;

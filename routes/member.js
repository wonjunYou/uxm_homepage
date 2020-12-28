var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const multer = require('multer');
const Member = require('../models/member');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images/');
	},
	filename: function (req, file, cb) {
		cb(null, `${req.body.input_name_en}.jpg`);
	},
});
var upload = multer({ storage: storage });

var rankObj = {"Professor":"0", "Ph.D":"1", "master":"2","underGraduate":"3"};


router.get('/', function (req, res, next) {
	Member.find(function (err, mem) {
		mem.sort(function (a, b) {
			if (a.rank > b.rank) {
				return 1;
			}
			return -1;
		});
		res.render('member', { members: mem });
	});
	// //불러오는것 짜야함
	// res.render('member', { title: 'Express' });
});

router.get('/upload', function (req, res, next) {
	res.render('member_upload');
});

//upload
router.post('/member_up', upload.single('input_img'), function (req, res) {
	var members = new Member();
  members.rank = rankObj[req.body.selected_rank];
  members.name_en = req.body.input_name_en;
  members.name_kr = req.body.input_name_kr;
  members.affiliation = req.body.input_affiliation;
  members.main_research = req.body.input_main_research;
  members.email = req.body.input_email;
  members.img = req.file.filename;
  members.save(function (err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/member');
	});
});

//수정 & 삭제

module.exports = router;

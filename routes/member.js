var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const multer = require('multer');
const Member = require('../models/member');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images/');
	},
	filename: function (req, file, cb) {
		cb(
			null, `${req.body.name_en}`
		);
	},
});
var upload = multer({storage : storage});

router.get('/', function(req, res, next) {
  //불러오는것 짜야함
  res.render('member', { title: 'Express' });
});

router.get('/upload',function (req, res, next){
  res.render('member_upload');
})

//upload
router.post('/member_up',upload.single('input_img'),function(req,res){
  var members = new Member();
  console.log(__dirname);
  var memberObj = {
    rank : req.body.selected_rank,
    name_en : req.body.input_name_en,
    name_kr : req.body.input_name_kr,
    affiliation : req.body.input_affiliation,
    main_research : req.body.input_main_research,
    img: {
      // 여기 path가 잘못 된 것 같은데,,
      data: fs.readFileSync(path.join(__dirname+'/../public/images/')),
      contentType : 'image/*'
    }
 }
 members.create(memberObj , function(err, item) {
   if(err){
     console.log(err);
   }
    else{
      res.redirect('/member');
   }
 });
});
//수정 & 삭제


module.exports = router;

var express = require('express');
var router = express.Router();

const Photo = require('../models/photo');
// for image upload
const multer = require('multer');
const photo = require('../models/photo');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images/');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			`${req.body.input_title}_${file.originalname}`.split(' ').join('-')
		);
	},
});
const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		if (
			file.mimetype == 'image/png' ||
			file.mimetype == 'image/jpg' ||
			file.mimetype == 'image/jpeg'
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png .jpg and .jpeg format allowed!'));
		}
	},
});

router.get('/', function (req, res, next) {
	Photo.find(
		{ date: { $gt: new Date(2019, 11, 31), $lt: new Date(2021, 0, 1) } },
		function (err, photo) {
			res.render('photo', { photos: photo });
		}
	);
});
// router.get('/:year', function (req, res, next) {
// 	if (req.params.year == 'pre') {
// 		let year = new Date().getFullYear();
// 		Photo.find(
// 			{
// 				time: {
// 					$lt: new Date(year - 2, 1, 1),
// 				},
// 			},
// 			function (err, photo) {
// 				res.render('photo', { photos: photo });
// 			}
// 		);
// 	} else {
// 		let year = Number(req.params.year);
// 		Photo.find(
// 			{
// 				time: {
// 					$gte: new Date(year, 1, 1),
// 					$lt: new Date(year + 1, 1, 1),
// 				},
// 			},
// 			function (err, photo) {
// 				res.render('photo', { photos: photo });
// 			}
// 		);
// 	}
// });
router.get('/detail/:id', function (req, res, next) {
	Photo.findOne({ _id: req.params.id }, function (err, photo) {
		res.render('photo_detail', { photo: photo });
	});
});
router.get('/upload', function (req, res, next) {
	res.render('photo_upload');
});
router.post('/photo_upload', upload.array('input_img'), function (req, res) {
	let photo = new Photo();
	photo.title = req.body.input_title;
	photo.description = req.body.input_description;
	photo.date = req.body.input_date.format();
	let images_array = [];
	for (let i = 0; i < req.files.length; i++) {
		images_array.push(req.files[i].filename);
	}
	photo.images = images_array;
	photo.save(function (err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/photo');
	});
});

module.exports = router;

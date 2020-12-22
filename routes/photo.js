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
	Photo.find(function (err, photo) {
		photo.sort(function (a, b) {
			if (a.date > b.date) {
				return -1;
			}
			return 1;
		});
		res.render('photo', { photos: photo });
	});
});

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
	photo.date = req.body.input_date;
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
router.get('/edit/:id', function (req, res) {
	Photo.findOne({ _id: req.params.id }, function (err, photo) {
		if (err) {
			return res.json(err);
		}
		res.render('photo_update', { photo: photo });
	});
});
router.post('/edit/:id', upload.array('input_img'), function (req, res) {
	let images_array = [];
	for (let i = 0; i < req.files.length; i++) {
		images_array.push(req.files[i].filename);
	}
	var photo = new Photo({
		_id: req.params.id,
		title: req.body.input_title,
		description: req.body.input_description,
		date: req.body.input_date,
		images: images_array,
	});
	Photo.updateOne({ _id: req.params.id }, photo, function (err, photo) {
		if (err) return res.json(err);
		res.redirect('/photo');
	});
});
router.get('/delete/:id', function (req, res) {
	var fs = require('fs');
	Photo.findOne({ _id: req.params.id }, function (err, photo) {
		for (source_url of photo.images) {
			fs.unlink(`public/images/${source_url}`, function (err) {
				if (err) {
					return res.json(err);
				}
			});
		}
	});
	Photo.deleteOne({ _id: req.params.id }, function (err, photo) {
		if (err) return res.json(err);
		res.redirect('/photo');
	});
});
module.exports = router;

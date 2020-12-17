var express = require('express');
var router = express.Router();
const photo = require('../models/photo');

router.get('/', function (req, res, next) {
	photo.find(
		{ time: { $gt: new Date(2019, 12, 31), $lt: new Date(2021, 1, 1) } },
		function (err, photo) {
			res.render('photo', { photos: photo });
		}
	);
});
router.get('/:year', function (req, res, next) {
	if (req.params.year == 'pre') {
		let year = new Date().getFullYear();
		photo.find(
			{
				time: {
					$lt: new Date(year - 2, 1, 1),
				},
			},
			function (err, photo) {
				res.render('photo', { photos: photo });
			}
		);
	} else {
		let year = Number(req.params.year);
		photo.find(
			{
				time: {
					$gte: new Date(year, 1, 1),
					$lt: new Date(year + 1, 1, 1),
				},
			},
			function (err, photo) {
				res.render('photo', { photos: photo });
			}
		);
	}
});
router.get('/photo_detail/:id', function (req, res, next) {
	photo.findOne({ _id: req.params.id }, function (err, photo) {
		res.render('photo_detail', { photo: photo });
	});
});
router.get('/photo/upload', function (req, res, next) {
	res.render('photo_upload');
});
module.exports = router;

var express = require('express');
var router = express.Router();

const Publication = require('../models/publication');
// for file upload
const multer = require('multer');
const publication = require('../models/publication');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, `${req.body.input_title_en}_${req.body.input_author}.pdf`);
	},
});
const upload = multer({ storage: storage });

// get/post
router.get('/', function (req, res, next) {
	// const categories = [
	// 	'international_journal',
	// 	'international_conference',
	// 	'domestic_journal',
	// 	'domestic_conference',
	// ];
	// let pub_list = [];
	// for (category of categories) {
	// 	Publication.find({ category: category }, function (err, publication) {
	// 		pub_list.push(publication);
	// 	});
	// }
	// res.render('publication', { pub_list: pub_list });

	// let pub;
	// Publication.find(
	// 	{ category: 'international_journal' },
	// 	function (err, publication) {
	// 		pub = publication;
	// 	}
	// );
	// res.render('publication', { publications: pub });

	Publication.find(function (err, pub) {
		pub.sort(function (a, b) {
			if (a.category > b.category) {
				return -1;
			}
			return 1;
		});
		res.render('publication', { publications: pub });
	});
});

router.get('/detail/:id', function (req, res, next) {
	Publication.findOne({ _id: req.params.id }, function (err, publication) {
		res.render('publication_detail', { publication: publication });
	});
});

router.get('/upload', function (req, res, next) {
	res.render('publication_upload');
});

router.post('/pub_upload', upload.single('input_file'), function (req, res) {
	var publication = new Publication();
	publication.category = req.body.select_category;
	publication.date = req.body.input_date;
	publication.author = req.body.input_author;
	publication.title_kr = req.body.input_title_kr;
	publication.title_en = req.body.input_title_en;
	publication.journal = req.body.input_journal;
	publication.abstract = req.body.input_abstract;
	publication.paper_url = req.file.filename;
	publication.save(function (err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/publication');
	});
});
router.get('/:url', function (req, res) {
	const file = `${__dirname}/../public/uploads/${req.params.url}`;
	res.download(file);
});
router.get('/edit/:id', function (req, res) {
	Publication.findOne({ _id: req.params.id }, function (err, publication) {
		if (err) {
			return res.json(err);
		}
		res.render('publication_update', { publication: publication });
	});
});
router.post('/edit/:id', upload.single('input_file'), function (req, res) {
	var publication = new Publication({
		_id: req.params.id,
		category: req.body.select_category,
		date: req.body.input_date,
		author: req.body.input_author,
		title_kr: req.body.input_title_kr,
		title_en: req.body.input_title_en,
		journal: req.body.input_journal,
		abstract: req.body.input_abstract,
		paper_url: req.file.filename,
	});
	Publication.updateOne(
		{ _id: req.params.id },
		publication,
		function (err, notice) {
			if (err) return res.json(err);
			res.redirect('/publication');
		}
	);
});
router.get('/delete/:id', function (req, res) {
	var fs = require('fs');
	Publication.findOne({ _id: req.params.id }, function (err, pub) {
		fs.unlink(`public/uploads/${pub.paper_url}`, function (err) {
			if (err) {
				return res.json(err);
			}
		});
	});
	Publication.deleteOne({ _id: req.params.id }, function (err, notice) {
		if (err) return res.json(err);
		res.redirect('/publication');
	});
});
module.exports = router;

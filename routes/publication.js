var express = require('express');
var router = express.Router();

var Publication = require('../models/publication');
// for file upload
const multer = require('multer');
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
	Publication.find(
		{ category: 'international_journal' },
		function (err, publication) {
			res.render('publication', { publications: publication });
		}
	);
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
	console.log(`category = ${req.body.select_category}`);
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
module.exports = router;

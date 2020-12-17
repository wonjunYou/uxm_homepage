var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('publication');
});
router.get('/upload', function (req, res, next) {
	res.render('publication_upload');
});

module.exports = router;

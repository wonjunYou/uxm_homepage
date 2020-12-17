const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publicaionSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			enum: [
				'international_journal',
				'international_conference',
				'domestic_journal',
				'domestic_conference',
			],
		},
		author: String,
		title_kr: String,
		title_eng: String,
		journal: String,
		abstract: String,
		paper_url: String,
	},
	{ collection: 'publication' }
);

module.exports = mongoose.model('publicaion', publicationSchema);

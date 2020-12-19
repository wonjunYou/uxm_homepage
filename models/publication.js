const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publicationSchema = new mongoose.Schema(
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
		date: Date,
		author: String,
		title_kr: String,
		title_en: String,
		journal: String,
		abstract: String,
		paper_url: String,
	},
	{ collection: 'publication' }
);

module.exports = mongoose.model('publicaion', publicationSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new mongoose.Schema(
	{
		rank: String,
		name_en: String,
		name_kr: String,
		affiliation: String,
		main_research: String,
		email: String,
		img: String,
	},
	{ collection: 'member' }
);

module.exports = mongoose.model('member', memberSchema);

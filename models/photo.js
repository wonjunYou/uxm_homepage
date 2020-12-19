const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const photoSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		date: Date,
		images: [String],
	},
	{ collection: 'photo' }
);

module.exports = mongoose.model('photo', photoSchema);

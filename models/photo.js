const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const photoSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		time: Date,
		images: [
			{
				source_url: String,
			},
		],
	},
	{ collection: 'photo' }
);

module.exports = mongoose.model('photo', photoSchema);

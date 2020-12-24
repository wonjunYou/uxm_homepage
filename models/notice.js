const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Counter = require('./counter');

const noticeSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		writer: String,
		views: { type: Number, default: 0 },
		date: { type: Date, default: Date.now() },
		numId: {type:Number},
		// attachment: String,
		createdAt: { type: Date, default: Date.now },
	},
	{ collection: 'notice' }
);

noticeSchema.pre('save', async function(next){
	var notice = this;
	if(notice.isNew){
		counter = await Counter.findOne({name:'notices'}).exec();
		if(!counter) counter = await Counter.create({name:'notices'});
		counter.count++;
		counter.save();
		notice.numId = counter.count;
	}
	return next();
});

module.exports = mongoose.model('notice', noticeSchema);

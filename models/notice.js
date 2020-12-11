const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noticeSchema = new mongoose.Schema({
    title:String,
    content:String,
    writer:String,
    date:{type:Date, default:Date.now()},
    
},{collection:'notice'});

module.exports = mongoose.model('notice',noticeSchema);

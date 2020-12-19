const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    kr:String,
    eng:String,
    date_start:{type:Date},
    date_end:{type:Date},
    category:{type:String},
  attachment:{type:mongoose.Schema.Types.ObjectId, ref:'file'}, // 1
  createdAt:{type:Date, default:Date.now},
    
},{collection:'project'});

module.exports = mongoose.model('project',noticeSchema);

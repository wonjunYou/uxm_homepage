const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    kr:String,
    eng:String,
    date_start:Date,
    date_end:Date,
    category:String,
    createdAt:{type:Date, default:Date.now},
    
},{collection:'project'});

module.exports = mongoose.model('project',projectSchema);

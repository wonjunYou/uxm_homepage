const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    kr:String,
    eng:String,
    date_start:Date,
    date_end:Date,
    category: {
        type: String,
        enum: [
            'national',
            'industrial',
            'internal'
        ]
    },
    createdAt:{type:Date, default:Date.now},
    
},{collection:'project'});

module.exports = mongoose.model('project',projectSchema);

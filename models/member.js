const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new mongoose.Schema(
  {
    rank:{
      type:String,
      enum:[
        'Professor',
        'Ph.D',
        'master',
        'underGraduate'
      ],
    },
    name_en : String,
    name_kr : String,
    affiliation: String,
    main_research : String,
    img:
    {
      data: Buffer,
      contentType: String
    },

  },
  {collection: 'member'}
);

module.exports = mongoose.model('member', memberSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, index: true, unique: true, trim: true},
  password: {type: String},
  createdAt: {type: Date, default: Date.now},
}, { 
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.methods.generateHash = function(password) {
  hash_password = bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      return "";
    }
    else return hash;
  })
  if (hash_password == "") return false;
  else return hash_password;
};

schema.methods.validatePassword = function(password) {
  compareResult = bcrypt.compare(password, this.password, function(err, result) {
    return result;
  })
  return compareResult;
};

var User = mongoose.model('User', schema);

module.exports = User;
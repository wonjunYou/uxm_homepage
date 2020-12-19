const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var schema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			index: true,
			unique: true,
			trim: true,
		},
		admin: { type: Boolean, required: true },
		password: { type: String },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// schema.methods.generateHash = function(password) {
//   hash_password = bcrypt.hash(password, 10, function(err, hash) {
//     if (err) {
//       return "";
//     }
//     else return hash;
//   })
//   if (hash_password == "") return false;
//   else return hash_password;
// };

schema.methods.validatePassword = function (password) {
	if (password == this.password) return true;
	else return false;
};

var User = mongoose.model('User', schema);

module.exports = User;

/** @format */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'user',
	},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

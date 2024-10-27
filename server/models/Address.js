/** @format */

const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
	{
		userId: String,
		address: String,
		phone: String,
		city: String,
		pincode: String,
		notes: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Address', AddressSchema);

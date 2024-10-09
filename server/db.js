/** @format */

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('DB Connected');
	} catch (error) {
		console.error('DB Connection Error:', error);
		process.exit(1); // Stop the server if the database connection fails
	}
};

module.exports = connectDB;

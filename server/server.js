/** @format */ const express = require('express');
const connectDB = require('./db'); // Import the connection function
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/products-routes');

const app = express();
// Connect to the database
connectDB();

app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'DELETE', 'PUT'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Cache-Control',
			'Expires',
			'Pragma',
		],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter);

// Get the PORT from the .env file, with a fallback to 3000 if not provided
const PORT = process.env.PORT || 5000;

// Your server and route configurations
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

/** @format */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

//register

const registerUser = async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		// Check if the email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: 'Email already in use',
			});
		}

		const hashPassword = await bcrypt.hash(password, 12);
		const newUser = new User({
			userName,
			email,
			password: hashPassword,
		});

		await newUser.save();
		res.status(200).json({
			success: true,
			message: 'Registration successful',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'An error occurred',
		});
	}
};

//login
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.json({
				success: false,
				message: "User doesn't exist, Please create an account",
			});
		}

		const checkPasswordMatch = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!checkPasswordMatch) {
			return res.json({
				success: false,
				message: 'Incorrect password, please try again',
			});
		}

		const token = jwt.sign(
			{
				id: existingUser._id,
				role: existingUser.role,
				email: existingUser.email,
				userName: existingUser.userName,
			},
			'CLIENT_SECRET_KEY', // Make sure you replace this with your actual secret key
			{ expiresIn: '1d' } // Token expiration time (optional)
		);

		// Set the token in a cookie
		res
			.cookie('token', token, {
				httpOnly: true,
				sameSite: 'Strict',
				secure: false,
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})
			.json({
				success: true,
				message: 'Logged in successfully',
				user: {
					email: existingUser.email,
					role: existingUser.role,
					id: existingUser._id,
					userName: existingUser.userName,
				},
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'An error occurred',
		});
	}
};

//logout
const logoutUser = (req, res) => {
	res.clearCookie('token').json({
		success: true,
		message: 'Logged out successfully!',
	});
};

//auth middleware
const authMiddleware = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized user! No token provided.',
		});
	}

	try {
		const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
		req.user = decoded; // Token is valid
		next(); // Proceed to the next middleware or route handler
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({
				success: false,
				message: 'Session expired. Please log in again.',
			});
		}
		return res.status(401).json({
			success: false,
			message: 'Invalid token.',
		});
	}
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };

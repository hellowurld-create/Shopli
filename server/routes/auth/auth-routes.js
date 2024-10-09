/** @format */
const express = require('express');
const {
	registerUser,
	loginUser,
	logoutUser,
	authMiddleware,
} = require('../../controllers/auth/auth-controller');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', authMiddleware, (req, res) => {
	const user = req.user;
	res.status(200).json({
		success: true,
		message: 'Authenticated User',
		user,
	});
});

module.exports = router;

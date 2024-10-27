/** @format */

const express = require('express');

const {
	createOrder,
	capturePayments,
} = require('../../controllers/shop/order-controller');

const router = express.Router();

router.post('/create', createOrder);
router.post('/capture', capturePayments);

module.exports = router;

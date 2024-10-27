/** @format */

const paypal = require('paypal-rest-sdk');

paypal.configure({
	mode: 'sandbox',
	client_id:
		'ARKwUBQrasaze2JPGutCbcKZbf6ljZFWWCcUkzRddMISgysg06xL8WaWApU932YzFsMYlEwEq_NTfs1P',
	client_secret:
		'ENSw-ImjhgFHXeH_5ftty9IBkywN8DhtNeHZZ9bgTQ8yRa1JOhrkYNpTZGKQ0g6cXHXu-yKip4Ub0JT2',
});

module.exports = paypal;

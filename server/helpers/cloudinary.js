/** @format */

const cloudinary = require('cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: 'dwclcns5j',
	api_key: '261413141588415',
	api_secret: '5RZlatnNjK5PIkJMgCjageJLo34',
});

const storage = new multer.memoryStorage();

async function handleImageUploadUtils(file) {
	const result = await cloudinary.uploader.upload(file, {
		resource_type: 'auto',
	});
	return result;
}

const upload = multer({ storage });

module.exports = { upload, handleImageUploadUtils };

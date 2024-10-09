/** @format */

const express = require('express');

const {
	handleImageUploads,
	addProduct,
	editProduct,
	fetchAllProducts,
	deleteProduct,
} = require('../../controllers/admin/products-controller');

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUploads);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/get', fetchAllProducts);

module.exports = router;

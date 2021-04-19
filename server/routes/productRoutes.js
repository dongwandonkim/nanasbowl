const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'upload/' });

//create PRODUCT
router.post(
  '/create',
  upload.single('image'),
  productController.product_create_post
);

//all products
router.get('/', productController.product_index);

//product detail
router.get('/:id', productController.product_details);

//DELETE a product
router.delete('/:id', productController.product_delete);

//UPDATE a product
router.put(
  '/:id/edit',
  upload.single('image'),
  productController.product_update
);

module.exports = router;

const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  dest: 'upload/',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('File must be an image'));
    }
    cb(undefined, true);
  },
});

//create PRODUCT
router.post(
  '/create',
  upload.single('image'),
  productController.product_create_post,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
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
  productController.product_update,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;

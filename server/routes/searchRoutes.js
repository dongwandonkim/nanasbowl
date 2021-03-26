const express = require('express');
const searchController = require('../controllers/searchController');
const router = express.Router();

//search product
router.get('/', searchController.search_product);

module.exports = router;

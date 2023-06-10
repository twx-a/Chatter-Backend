const express = require('express');
const router = express.Router();
const categoryController = require('../contollers/category-controller');

router.get('/', categoryController.getAllCategories);
router.get('/:categoryName', categoryController.getCategoryByName);

router.post('/addcategory', categoryController.addCategory);

router.delete('/deletecategory/:categoryId', categoryController.deleteCategory);

module.exports = router;
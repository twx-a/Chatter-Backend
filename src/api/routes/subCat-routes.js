const express = require('express');
const router = express.Router();
const subcatController = require('../contollers/subCat-controller');

router.get('/', subcatController.getAllSubCat);

router.post('/addsubcat', subcatController.addSubCat);

router.delete('/:subcatId', subcatController.deleteSubCat);

module.exports = router;
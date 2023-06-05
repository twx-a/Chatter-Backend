const express = require('express');
const router = express.Router();
const contentController = require('../contollers/content-controller');

router.get('/', contentController.getAllContent);
router.get('/:userId', contentController.getContentById);

router.patch('/:contentId', contentController.updateContent);

router.delete('/:contentId', contentController.deleteContent);

module.exports = router;

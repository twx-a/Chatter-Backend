const express = require('express');
const router = express.Router();
const commentController = require('../contollers/comment-controller');

router.get('/', commentController.getAllComments)
router.get('/:userId', commentController.getAllCommentsByUserId);



module.exports = router;
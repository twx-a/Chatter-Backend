const commentService = require('../services/comment-service');

const getAllComments = async (req, res, next) => {
    const comments = await commentService.getAllComments();
    res.json({comments: comments});
}

const getAllCommentsByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    const comments = await commentService.getAllCommentsByUserId(userId);
    res.json({comments: comments});
}

module.exports = {
    getAllCommentsByUserId,
    getAllComments
}
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

const createComment = async (req, res, next) => {
    const { userinput, contentId, userId } = req.body;
    try {
        await commentService.createComment(userinput, contentId, userId);
        res.json({ message: 'Comment Created' });
    } catch (err) {
        throw new Error('Failed to create new comment');
    }
};

module.exports = {
    getAllCommentsByUserId,
    getAllComments,
    createComment
}
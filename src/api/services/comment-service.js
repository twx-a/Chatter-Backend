const commentSchema = require('../models/comment-model');

const getAllComments = async () => {
    try{
        const comments = await commentSchema.find();
        return comments;
    }catch(err){
        throw new Error('no comments found');
    }
}

const getAllCommentsByUserId = async (userId) => {
    try{
        const comments = await commentSchema.find({userId: userId});
        console.log(comments)
        return comments;
    }catch(err){
        throw new Error('No comments found');
    }
}

module.exports = {
    getAllCommentsByUserId,
    getAllComments
}
const commentSchema = require('../models/comment-model');
const userSchema = require('../models/user-model');
const contentSchema = require('../models/content-model')

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
        return comments;
    }catch(err){
        throw new Error('No comments found');
    }
}

const createComment = async (comments, userId, contentId) => {

    const existingUser = await userSchema.findOne({_id: userId});
    if(!existingUser){
        throw new Error("Invalid User");
    }

    const existingContent = await contentSchema.findOne({_id: contentId});

    if(!existingContent){
        throw new Error("No content found");
    }
    const newComment = new commentSchema({
        comments,
        userId
    });
    let result;
    try {
        result = await newComment.save();
    } catch (err) {
        throw new Error('Failed to create content');
    }

    if(result){
        existingContent.commentId.push(result._id);
        await existingContent.save();
    }


};
module.exports = {
    getAllCommentsByUserId,
    getAllComments,
    createComment
}
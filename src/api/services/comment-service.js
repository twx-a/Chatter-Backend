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
        console.log(comments)
        return comments;
    }catch(err){
        throw new Error('No comments found');
    }
}

const createComment = async (userinput, contentId, userId) => {

    const existingUser = await userSchema.findOne({userId: userId});
    if(!existingUser){
        throw new Error("Invalid User");
    }

    const existingContent = await contentSchema.findOne({contentId: contentId});

    if(!existingContent){
        throw new Error("No content found");
    }
    const newComment = new commentSchema({
        userinput,
        contentId,
        userId
    });

    try {
        await newComment.save();
    } catch (err) {
        throw new Error('Failed to create content');
    }
};
module.exports = {
    getAllCommentsByUserId,
    getAllComments,
    createComment
}
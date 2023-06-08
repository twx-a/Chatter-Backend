const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const commentSchema = new mongoose.Schema({
    comments: {
        type: String,
        maxlength: 150,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'content',
        required: true
    }

},{validateBeforeSave: true});

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('comment', commentSchema, 'comment');

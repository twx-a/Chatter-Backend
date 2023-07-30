const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const contentSchema = new mongoose.Schema({
    userinput: {
        type: String,
        maxlength: 250,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    commentId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]

},{validateBeforeSave: true});

contentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('content', contentSchema, 'content');

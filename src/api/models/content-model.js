const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const contentSchema = new mongoose.Schema({
    userinput: {
        type: String,
        maxlength: 250,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    commentId: {
        type: String,
        required: true
    }

},{validateBeforeSave: true});

contentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('content', contentSchema, 'content');

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
},{validateBeforeSave: true, versionKey: false});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema, 'user');

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const subcatSchema = new mongoose.Schema({
    subcategoryname: {
        type: String,
        required: true,
        unique: true
    }
},{uniqueValidator: true});

subcatSchema.plugin(uniqueValidator);

module.exports = mongoose.model('subcat', subcatSchema, 'subcat');
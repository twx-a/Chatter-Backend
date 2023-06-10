const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true
  },
  subcatId: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcat',
        required: true
    },
  ],
},{uniqueValidator: true});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("category", categorySchema, "category");

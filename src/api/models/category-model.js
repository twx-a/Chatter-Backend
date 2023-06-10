const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// const categorySchema = new mongoose.Schema({
//   categorytype: {
//     general: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'subcat'
//     }],
//     sports: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'subcat'
//     }],
//     games: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'subcat'
//     }],
//     pasttime: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'subcat'
//     }],
//     hobbies: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'subcat'
//     }]
//   }
// }, {uniqueValidator: true});

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

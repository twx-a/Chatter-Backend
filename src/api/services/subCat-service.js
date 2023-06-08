const subcatSchema = require('../models/subCat-model');

const getAllSubCat = async () => {
    try{
        const subcats = await subcatSchema.find();
        return subcats;
    }catch(err){
        throw new Error('No sub-category found');
    }
}

const addSubCat = async (subcategoryname) => {
    let subcat;
    try{
        subcat = await subcatSchema.findOne({subcategoryname: subcategoryname});
    }catch(err){
        throw new Error('sub-category already exists');
    }

    if(subcat){
        throw new Error('sub-category already exists');
    };

    const newSubCat = new subcatSchema({
        subcategoryname
    });

    try{
        newSubCat.save();
    }catch(err){
        throw new Error('failed to create sub-category');
    }
}

const deleteSubCat = async (subcatId) => {
    let result;
    try{
        result = await subcatSchema.deleteOne({_id: subcatId});
    }catch(err){
        throw new Error('Failed to delete');
    }

    if(result.deletedCount === 0){
        throw new Error('Failed to delete');
    }
}

module.exports = {
    getAllSubCat,
    addSubCat,
    deleteSubCat
}
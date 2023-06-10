const categorySchema = require("../models/category-model");

const getAllCategories = async () => {
  try {
    const categories = await categorySchema.find();
    return categories;
  } catch (err) {
    throw new Error("No category found");
  }
};

const getCategoryByName = async (categoryName) => {
    try{
        const category = await categorySchema.findOne({categoryname: categoryName}).populate({
            path: 'subcatId',
            select: '-_id'
        });
        return category;
    }catch(err){
        throw new Error('No category found');
    }
}

const addCategory = async (categoryname, subcatId) => {
    let existingCategory;
    try{
        existingCategory = await categorySchema.findOne({categoryname: categoryname});
    }catch(err){
        throw new Error('Category already exists');
    }

    if(existingCategory){
        throw new Error('Category already exists');
    }

    const newCategory = new categorySchema({
        categoryname,
        subcatId: subcatId || []
    });

    try{
        await newCategory.save();
    }catch(err){
        throw new Error('Failed to create new category');
    }
}

const deleteCategory = async (categoryId) => {
    let result;
    try{
        result = await categorySchema.deleteOne({_id: categoryId});
    }catch(err){
        throw new Error('Failed to delete');
    }

    if(result.deletedCount === 0){
        throw new Error('The category that you want to delete cannot be found');
    }
}

module.exports = {
  getAllCategories,
  getCategoryByName,
  addCategory,
  deleteCategory
};

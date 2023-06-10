const categoryService = require('../services/category-service');

const getAllCategories = async (req, res, next) => {
    const categories = await categoryService.getAllCategories();
    res.json({categories: categories});
}

const getCategoryByName = async (req, res, next) => {
    const categoryName = req.params.categoryName;
    const category = await categoryService.getCategoryByName(categoryName);
    res.json({category: category});
}


const addCategory = async (req, res, next) => {
    const {categoryname, subcatId} = req.body;
    try{
        await categoryService.addCategory(categoryname, subcatId);
        res.json({message: "creating of category success"});
    }catch(err){
        throw new Error('Creating of new category failed');
    }
}

const deleteCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try{
        await categoryService.deleteCategory(categoryId);
        res.json({message: "category deleted"});
    }catch(err){
        throw new Error('Failed to delete category');
    }
}

module.exports = {
    getAllCategories,
    getCategoryByName,
    addCategory,
    deleteCategory
}
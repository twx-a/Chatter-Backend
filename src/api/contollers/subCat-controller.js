const subcatService = require('../services/subCat-service');

const getAllSubCat = async (req, res, next) => {
    const subcats = await subcatService.getAllSubCat();
    res.json({subcats: subcats});
}

const addSubCat = async (req, res, next) => {
    const {subcategoryname}  = req.body;
    try{
        await subcatService.addSubCat(subcategoryname);
        res.json({message: 'Sub-Category added'});
    }catch(err){
        throw new Error('Failed to add new Sub-Category');
    }
}

const deleteSubCat = async (req, res, next) => {
    const subcatId = req.params.subcatId;
    try{
        await subcatService.deleteSubCat(subcatId);
        res.json({message: 'Delete success'});
    }catch(err){
        throw new Error('Failed to delete');
    }
}

module.exports = {
    getAllSubCat,
    addSubCat,
    deleteSubCat
}
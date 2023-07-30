const contentService = require("../services/content-service");

const getAllContent = async (req, res, next) => {
  const content = await contentService.getAllContent();
  res.json({ content: content });
};

const getContentById = async (req, res, next) => {
  const userId = req.params.userId;
  const content = await contentService.getContentById(userId);
  res.json({ content: content });
};

const createContent = async (req, res, next) => {
  const {userinput, categoryId, userId} = req.body;
  try{
    await contentService.createContent(userinput, categoryId, userId);
    res.json({message: 'Content created'});
  }catch(err){
    throw new Error('Failed to create new content');
  }
};

const updateContent = async (req, res, next) => {
  const contentId = req.params.contentId;
  const { userinput } = req.body;
  const updatedContent = await contentService.updateContent(
    contentId,
    userinput
  );
  res.json({ message: "Update success" });
};

const deleteContent = async (req, res, next) => {
    const contentId = req.params.contentId;
    try{
        await contentService.deleteContent(contentId);
        res.json({message: "Delete success"});
    }catch(err){
        throw new Error('Delete Failed');
    }
};

module.exports = {
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  createContent
};

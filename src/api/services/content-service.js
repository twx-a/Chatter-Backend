const contentSchema = require("../models/content-model");

const getAllContent = async () => {
  try {
    const content = await contentSchema.find();
    return content;
  } catch (err) {
    throw new Error("No content Found");
  }
};

const getContentById = async (userId) => {
  try {
    const contents = await contentSchema
      .find({ userId })
      .populate({
        path: 'userId',
        select: '-password'
      })
      .exec();
    if (!contents) {
      throw new Error("No content found for userId");
    }
    return contents;
  } catch (err) {
    throw new Error("No content found for userId");
  }
};

const updateContent = async (contentId, userinput) => {
  let content;
  try{
    content = await contentSchema.findById(contentId);
  }catch(err){
    throw new Error('Cannot find content');
  }

  if(!content){
    throw new Error('Cannot find content');
  }

  content.userinput = userinput;

  try{
    await content.save();
  }catch(err){
    throw new Error('Upgrade failed');
  }
}

const deleteContent = async (contentId) => {
  let result;
  try{
    result = await contentSchema.deleteOne({_id: contentId});
  }catch(err){
    throw new Error('Delete failed');
  }

  if(result.deletedCount === 0){
    throw new Error('No content found for Id');
  }
}

module.exports = {
  getAllContent,
  getContentById,
  updateContent,
  deleteContent
};

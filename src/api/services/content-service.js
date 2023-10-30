const contentSchema = require("../models/content-model");

const getAllContent = async () => {
  try {
    const content = await contentSchema.find().populate([{
      path: 'userId',
      select: '-_id -password'
    },
    {
      path: 'categoryId',
      select: '-_id',
      populate: {
        path: 'subcatId',
        select: '-_id'
      }
    },
    {
      path: 'commentId',
      select: '-_id',
      populate: {
        path: 'userId',
        select: '-password -_id'
      }
    }]);
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

const createContent = async (userinput, categoryId, userId) => {
  const newContent = new contentSchema({
    userinput,
    categoryId,
    userId
  });

  try {
    await newContent.save();
  } catch (err) {
    throw new Error('Failed to create content');
  }
};

const updateContent = async (contentId, userinput) => {
  let content;
  try {
    content = await contentSchema.findById(contentId);
  } catch (err) {
    throw new Error('Cannot find content');
  }

  if (!content) {
    throw new Error('Cannot find content');
  }
 
  content.userinput = userinput;

  try {
    await content.save();
  } catch (err) {
    throw new Error('Upgrade failed');
  }
}

const deleteContent = async (contentId) => {
  let result;
  try {
    result = await contentSchema.deleteOne({ _id: contentId });
  } catch (err) {
    throw new Error('Delete failed');
  }

  if (result.deletedCount === 0) {
    throw new Error('No content found for Id');
  }
}

module.exports = {
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  createContent
};

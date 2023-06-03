const userSchema = require("../models/user-model");
const HttpError = require("../models/http-error");
const bcrypt = require('bcrypt');

const getAllUsers = async (condition) => {
  try {
    if (condition) {
      const users = await userSchema.find().select(condition).exec();
      return users;
    } else {
      const users = await userSchema.find().exec();
      return users;
    }
  } catch (err) {
    const error = new HttpError("Could not retrieve users", 500);
    return next(error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await userSchema.findById(userId);
    return user;
  } catch (err) {
    const error = new HttpError("could not find user", 500);
    return next(error);
  }
};

const login = async (username, password) => {
  let existingUser;
  try {
    existingUser = userSchema.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("Could not find user", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Could not find user");
    return next(error);
  }

};

const register = async (username, password) => {
    let existingUser;
    try{
        existingUser = userSchema.findOne({username: username});
    }catch(err){
        const error = new HttpError('Register failed');
        return next(error);
    }

    if(existingUser){
        const error = new HttpError('Register failed');
        return nextt(error);
    }

    let hashPassword;
    try{
        hashPassword = await bcrypt.hash(password, 12);
    }catch(err){
        const error = new HttpError('hashing of password failed');
        return next(error);
    }

    const newUser = new userSchema({
        username,
        password: hashPassword
    });

    try{
        await newUser.save();
    }catch(err){
        const error = new HttpError('creating user failed', 500);
        return next(error);
    }
};

const updateUser = () => {};

const deleteUser = () => {};

module.exports = {
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser,
  deleteUser,
};

const userSchema = require("../models/user-model");
const HttpError = require("../models/http-error");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: ".env.dev" });

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
    throw new Error("Could not retrieve users");
  }
};

const getUserById = async (userId) => {
  try {
    const user = await userSchema.findById(userId);
    return user;
  } catch (err) {
    throw new Error("could not find user");
  }
};

const login = async (username, password) => {
  let existingUser;
  try {
    existingUser = await userSchema.findOne({ username: username });
  } catch (err) {
    throw new Error("Login failed, Please try again ");
  }

  if (!existingUser) {
    throw new Error("Invalid credentials, could not log you in");
  }

  let isPasswordValid;
  try{
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  }catch(err){
    throw new Error("Wrong credentials, please try again");
  }

  if(!isPasswordValid){
    throw new Error("Invalid credentials, could not log you in");
  }

  const tokenData = {
    userId: existingUser._id,
    username: existingUser.username
  };

  let token;
  try{
    token = jwt.sign(tokenData, "super-secret-password", {expiresIn: "1h"});
  }catch(err){
    throw new Error("token creation failed");
  }

  tokenData.token = token;
  return tokenData;
};

const register = async (username, password) => {
  const tokenPassword = process.env.tokenPassword;
  let existingUser;
  try {
    existingUser = await userSchema.findOne({ username: username });
  } catch (err) {
    throw new Error("Register failed");
  }

  if (existingUser) {
    throw new Error("User already exists");
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    throw new Error("hashing of password failed");
  }

  const newUser = new userSchema({
    username,
    password: hashPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    throw new Error("creating user failed");
  }

  const tokenData = {
    name: newUser.username
  };

  let token;
  try{
    token = jwt.sign(tokenData, tokenPassword, {expiresIn: "1h"});
  }catch(err){
    throw new Error("Failed to create token");
  }
  tokenData.token = token;
  return tokenData;
};

const updateUser = async (userId, username) => {
  let existingUser;
  try{
    existingUser = await userSchema.findById(userId);
  }catch(err){
    throw new Error('User not found');
  }


  if(!existingUser){
    throw new Error('User not found');
  }
  existingUser.username = username;

  try{
    await existingUser.save();
  }catch(err){
    throw new Error('update user fail');
  }
}  

const deleteUser = async (userId) => {
  let result;
  try{
    result = await userSchema.deleteOne({_id: userId});
  }catch(err){
    throw new Error('Delete user failed');
  }
  
  if(result.deletedCount === 0){
    throw new Error('user not found')
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser,
  deleteUser,
};

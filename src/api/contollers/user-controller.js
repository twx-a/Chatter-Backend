const userService = require('../services/user-service');
const HttpError = require('../models/http-error');

const getAllUsers = async (req, res, next) => {
    try{
        const users = await userService.getAllUsers('-password');
        res.status(200).json({users: users});
    }catch(err){
        const error = new HttpError('No users found', 500);
        return next(error);
    }
}

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;
    try{
        const user = await userService.getUserById(userId);
        res.status(200).json({user: user});
    }catch(err){
        const error = new HttpError('Could not find user');
        return next(error);
    }
};

const login = (req, res, next) => {
    const {username, password} = req.body;
    
}

const register = async (req, res, next) => {
    const {username, password} = req.body;
    try{
        const newUser = await userService.register(username, password);
        res.status(201).json({message: 'User created'});
    }catch(err){
        const error = new HttpError('Something went wrong');
        return next(error);
    }
}

const updateUser = (req, res, next) => {

}

const deleteUser = (req, res, next) => {

}

module.exports = {
    getAllUsers,
    getUserById,
    login,
    register,
    updateUser,
    deleteUser
}
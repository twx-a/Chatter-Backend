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

const login = async (req, res, next) => {
    const {username, password} = req.body;
    const loginToken = await userService.login(username, password);
    res.json({loginToken: loginToken});
    
}

const register = async (req, res, next) => {
    const {username, password} = req.body;
    const newUser = await userService.register(username, password);
    res.status(201).json({tokenData: newUser});
}

const updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const {username} = req.body;
    const updatedUser = await userService.updateUser(userId, username);
    res.json({'Message': 'User updated'});
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    const result = await userService.deleteUser(userId);
    res.json({'Message': 'User deleted'});
}

module.exports = {
    getAllUsers,
    getUserById,
    login,
    register,
    updateUser,
    deleteUser
}
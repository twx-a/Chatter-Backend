const express = require('express');
const router = express.Router();
const userController = require('../contollers/user-controller');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);

router.post('/login', userController.login);
router.post('/register', userController.register);

router.patch('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);


module.exports = router;

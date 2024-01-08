const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/userRegister', userController.registerUser);
router.post('/loginUser', userController.loginUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.put('/updateUserById/:id', userController.updateUserById);
router.delete('/deleteUserById/:id', userController.deleteUserById);


module.exports = router;
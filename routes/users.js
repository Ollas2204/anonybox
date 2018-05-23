const express = require('express');
const router = express.Router();
const validateRegister = require('./../middlewares').validateRegister;
const usersController = require('./../controllers').users;
const authController = require('./../controllers').auth;

router.get('/register', usersController.showRegisterPage);

router.post(
  '/register', 
  validateRegister, 
  usersController.registerUser);

router.get('/login', usersController.showLoginPage);

router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);

router.get('/:userId/edit', usersController.showEditPage);

router.post('/:userId/edit', usersController.updateUser);

module.exports = router;
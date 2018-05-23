const express = require('express');
const router = express.Router();
const { validateRegister } = require('./../middlewares');
const usersController = require('./../controllers').users;
const { isLoggedIn } = require('./../middlewares');

router.get('/register', usersController.showRegisterPage);

router.post(
  '/register', 
  validateRegister, 
  usersController.registerUser);

router.get(
  '/:userId', 
  isLoggedIn, 
  usersController.showProfilePage);

router.get('/:userId/edit', usersController.showEditPage);

router.post('/:userId/edit', usersController.updateUser);

module.exports = router;
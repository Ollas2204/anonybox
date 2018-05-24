const express = require('express');
const router = express.Router();
const { validateRegister } = require('./../middlewares');
const usersController = require('./../controllers').users;
const { isLoggedIn, isLoggedOut } = require('./../middlewares');
const { catchErrors } = require('./../handlers/errorHandlers');

router.get(
  '/register',
  isLoggedOut,
  usersController.showRegisterPage);

router.post(
  '/register', 
  validateRegister, 
  catchErrors(usersController.registerUser));

router.get(
  '/:userId', 
  isLoggedIn, 
  usersController.showProfilePage);

router.get('/:userId/edit', usersController.showEditPage);

router.post('/:userId/edit', usersController.updateUser);

module.exports = router;
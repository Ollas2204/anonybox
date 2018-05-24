const express = require('express');
const router = express.Router();
const { validateRegister } = require('./../middlewares');
const usersController = require('./../controllers').users;
const { isLoggedIn, 
        isLoggedOut, 
        isCredetialSame, 
        validateUserUpdate } 
        = require('./../middlewares');
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
  isCredetialSame,
  usersController.showProfilePage);

router.get(
  '/:userId/edit',
  isLoggedIn,
  isCredetialSame,
  usersController.showEditPage);

router.post(
  '/:userId/edit',
  isLoggedIn,
  isCredetialSame,
  validateUserUpdate,
  catchErrors(usersController.updateUser)
);

router.delete(
  '/:userId/edit',
  isLoggedIn,
  isCredetialSame,
  validateUserUpdate,
  usersController.deleteUser
);

module.exports = router;
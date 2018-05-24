const express = require('express');
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require('./../middlewares');
const models = require('../models');
const authController = require('./../controllers').auth;
const usersController = require('./../controllers').users;
const { Post, Comment, Like } = models;

router.get('/', (req,res)=>{
  Post.findAll().then(posts=>{
    res.render('index',{ posts, page: 'home' });
  });
});

router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});

router.get(
  '/login',
  isLoggedOut,
  usersController.showLoginPage
);

router.post(
  '/login',
  isLoggedOut,
  authController.loginUser);

router.get(
  '/logout', 
  isLoggedIn,
  authController.logoutUser);

module.exports = router;
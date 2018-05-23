const express = require('express');
const router = express.Router();
const isLoggedIn = require('./../middlewares').isLoggedIn;
const models = require('../models');
const authController = require('./../controllers').auth;
const usersController = require('./../controllers').users;
const {Post,Comment,Like} = models;

router.get('/', (req,res)=>{
  Post.findAll().then(posts=>{
    res.render('index',{posts:posts})
  })
});

router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});

router.get('/login', usersController.showLoginPage);

router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser);

module.exports = router;
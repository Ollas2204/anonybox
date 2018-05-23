const express = require('express');
const router = express.Router();
const isLoggedIn = require('./../middlewares').isLoggedIn;
const models = require('../models');
const {Post,Comment,Like} = models;

router.get('/', (req,res)=>{
  Post.findAll().then(posts=>{
    res.render('index',{posts:posts})
  })
})
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
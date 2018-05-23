const express = require('express')
const router = express.Router()
const postsController = require('./../controllers').posts;
const commentsRoutes = require('./comments');
const isLoggedIn = require('./../middlewares').isLoggedIn;

router.post(
  '/add', 
  isLoggedIn, 
  postsController.addPost);

router.post(
  '/update', 
  isLoggedIn, 
  postsController.updatePost);

router.get(
  '/delete/:id', 
  isLoggedIn, 
  postsController.deletePost);

router.use('/:postId/comments/', commentsRoutes);

module.exports = router;

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
  '/:postId/update', 
  isLoggedIn, 
  postsController.updatePost);

router.post(
  '/:postId/delete', 
  isLoggedIn, 
  postsController.deletePost);

router.use('/:postId/comments/', commentsRoutes);

module.exports = router;

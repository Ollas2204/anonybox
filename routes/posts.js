const express = require('express')
const router = express.Router()
const postsController = require('./../controllers').posts;
const commentsRoutes = require('./comments');
const { isLoggedIn } = require('./../middlewares');
const { catchErrors } = require('./../handlers/errorHandlers');


router.post(
  '/add', 
  isLoggedIn, 
  catchErrors(postsController.addPost)
);

router.post(
  '/:postId/update', 
  isLoggedIn, 
  catchErrors(postsController.updatePost)
);

router.post(
  '/:postId/delete', 
  isLoggedIn, 
  catchErrors(postsController.deletePost)
);

router.use('/:postId/comments/', commentsRoutes);

module.exports = router;

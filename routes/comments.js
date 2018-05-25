const express = require('express');
const router = express.Router({ mergeParams: true });
const commentsController = require('./../controllers').comments;
const { catchErrors } = require('./../handlers/errorHandlers');
const { isLoggedIn, validateContent } = require('./../middlewares');


router.post(
  '/add',
  isLoggedIn,
  validateContent,
  catchErrors(commentsController.addComment)
);

router.post(
  '/:commentId/edit', 
  isLoggedIn,
  validateContent,
  catchErrors(commentsController.updateComment)
);

router.post(
  '/:commentId/delete',
  isLoggedIn,
  catchErrors(commentsController.deleteComment)
);

module.exports = router;
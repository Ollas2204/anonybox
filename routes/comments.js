const express = require('express');
const router = express.Router({ mergeParams: true });
const commentsController = require('./../controllers').comments;
const { catchErrors } = require('./../handlers/errorHandlers');
const { isLoggedIn } = require('./../middlewares');


router.post(
  '/add',
  isLoggedIn,
  catchErrors(commentsController.addComment)
);

router.post(
  '/:commentId/edit', 
  isLoggedIn,
  catchErrors(commentsController.updateComment)
);

router.post(
  '/:commentId/delete',
  isLoggedIn,
  catchErrors(commentsController.deleteComment)
);

module.exports = router;
const express = require('express');
const router = express.Router({ mergeParams: true });
const commentsController = require('./../controllers').comments;

router.post('/add', commentsController.addComment);

router.post('/:commentId/edit', commentsController.updateComment);

router.post('/:commentId/delete', commentsController.deleteComment);

module.exports = router;
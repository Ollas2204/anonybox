const express = require('express');
const router = express.Router({ mergeParams: true });
const commentsController = require('./../controllers').comments;

router.post('/add', commentsController.addComment);

router.post('/edit/:commentId', commentsController.updateComment);

router.post('/delete/:commentId', commentsController.deleteComment);

module.exports = router;
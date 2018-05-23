const express = require('express')
const router = express.Router()
const postsController = require('./../controllers').posts;
const isLoggedIn = require('./../middlewares').isLoggedIn;

router.get('/add', isLoggedIn, postsController.showAddPostPage)
router.post('/add', isLoggedIn, postsController.addPost)


module.exports = router

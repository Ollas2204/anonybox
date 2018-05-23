const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const staticRoutes = require('./static');
const postRoutes = require('./posts')

router.use('/', staticRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes)

module.exports = router;

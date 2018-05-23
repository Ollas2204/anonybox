const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const staticRoutes = require('./static');

router.use('/', staticRoutes);
router.use('/users', userRoutes);

module.exports = router;
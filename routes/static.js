const express = require('express');
const router = express.Router();
const isLoggedIn = require('./../middlewares').isLoggedIn;

router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
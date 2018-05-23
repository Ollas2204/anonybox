const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const staticRoutes = require('./static');
const postRoutes = require('./posts')

router.use('/', staticRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes)
router.use('/test',(req,res)=>{
  res.render('test.ejs', {
    id:1, Contents:'test'
  })
})

module.exports = router;

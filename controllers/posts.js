const Post = require('./../models').Post;

exports.showAddPostPage = (req, res) => {
  res.render('addPost');
};

exports.addPost = (req, res) => {
  const newPost = req.body
  newPost.UserId = req.session.userId
  Post.create(newPost).then(post => {
    res.redirect('/')
  })
};

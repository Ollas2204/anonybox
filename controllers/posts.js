const { Post } = require('./../models');

exports.addPost = (req, res) => {
  const newPost = req.body
  newPost.UserId = req.session.userId
  Post.create(newPost).then(post => {
    req.flash('success', 'Post added successfully');
    res.redirect('back')
  });
};

exports.updatePost = (req, res) => {
  const updatePost = req.body;
  const postId = req.params.postId;
  Post.update(updatePost,{ where:{ id: postId }}).then(post => {
    req.flash('success', 'Post updated successfully');
    res.redirect('back')
  });
};

exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  Post.destroy({ where:{ id: postId }}).then(post =>{
    req.flash('success', 'Post deleted successfully');
    res.redirect('back')
  });
};

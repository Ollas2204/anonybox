const Post = require('./../models').Post;

exports.addPost = (req, res) => {
  const newPost = req.body
  newPost.UserId = req.session.userId
  Post.create(newPost).then(post => {
    res.redirect('/')
  })
};

exports.updatePost = (req, res) => {
  const updatePost = req.body;
  const postId = req.params.postId;
  Post.update(updatePost,{ where:{ id: postId }}).then(post => {
    res.redirect('/')
  })
};

exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  Post.destroy({ where:{ id: postId }}).then(post =>{
    res.redirect('/')
  });
};

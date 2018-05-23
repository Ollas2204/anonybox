const Post = require('./../models').Post;

exports.addPost = (req, res) => {
  const newPost = req.body
  newPost.UserId = req.session.userId
  Post.create(newPost).then(post => {
    res.redirect('/')
  })
};

exports.updatePost = (req, res) => {
  const updatePost = req.body
  updatePost.UserId = req.session.userId
  Post.update(updatePost,{where:{id:updatePost.id}}).then(post => {
    res.redirect('/')
  })
};

exports.deletePost = (req, res) => {
  const deletePost = req.body
  deletePost.UserId = req.session.userId
  Post.destroy({where:{id:req.params.id}}).then(post =>{
    res.redirect('/')
  })
};

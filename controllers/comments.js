const { Comment } = require('./../models');

exports.addComment = (req, res) => {
  const PostId = req.params.postId;
  const newComment = {
    UserId : req.session.userId,
    PostId,
    content: req.body.content
  }
  
  Comment.create(newComment)
    .then(result => {
      res.redirect('/');
    });
}

exports.updateComment = (req, res) => {
  const { commentId } = req.params;
  const updatedComment = req.body;
  Comment.update(updatedComment, { where : { id : commentId }})
    .then(result => {
      res.redirect('/');
    });
}

exports.deleteComment = (req, res) => {
  const { commentId } = req.params;
  Comment.destroy({ where : { id : commentId }})
    .then(result => {
      res.redirect('/');
    });
}
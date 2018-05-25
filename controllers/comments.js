const { Comment } = require('./../models');

exports.addComment = (req, res) => {
  const PostId = req.params.postId;
  const newComment = {
    UserId : req.session.userId,
    PostId,
    content: req.body.content
  }
  
  return Comment.create(newComment)
    .then(result => {
      req.flash('success', 'Comment added successfully');
      res.redirect('back');
    });
}

exports.updateComment = (req, res) => {
  const { commentId } = req.params;
  const updatedComment = req.body;
  return Comment.update(updatedComment, { where : { id : commentId }})
    .then(result => {
      req.flash('success', 'Comment updated successfully');
      res.redirect('back');
    });
}

exports.deleteComment = (req, res) => {
  const { commentId } = req.params;
  return Comment.destroy({ where : { id : commentId }})
    .then(result => {
      req.flash('success', 'Comment deleted successfully');
      res.redirect('back');
    });
}
'use strict';

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    hooks:{
      afterCreate(comment,option){
        sequelize.models.Post.findById(comment.PostId)
        .then(post=>{
          post.changed('updatedAt',true)
          post.set('updatedAt',comment.createdAt)
          post.save()
        })

      }
    }
  });
  Comment.associate = function(models) {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Post);
  };
  return Comment;
};
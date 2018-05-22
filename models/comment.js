'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Post);
  };
  return Comment;
};
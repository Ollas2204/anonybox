'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    UserId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  
  Post.associate = function(models) {
    Post.belongsToMany(models.User, {
      through: 'Comments'
    });    
  };

  return Post;
};
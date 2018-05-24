'use strict';
module.exports = (sequelize, DataTypes) => {
  var PostsTag = sequelize.define('PostsTag', {
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {});
  PostsTag.associate = function(models) {
  };
  return PostsTag;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    Tag.hasMany(models.PostsTag)
  };
  return Tag;
};
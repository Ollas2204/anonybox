'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Post,{
      through:'PostsTags'
    })
  };
  return Tag;
};
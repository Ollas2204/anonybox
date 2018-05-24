'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        const password = user.password;
        const hash = bcrypt.hashSync(password, 8);
        user.password = hash;
      }
    }
  });

  User.associate = function(models) {
    // User.belongsToMany(models.Post, {
    //   through: 'Comments'
    // });
    User.hasMany(models.Comment)
    User.hasMany(models.Post);
  };

  User.prototype.checkPassword = function(passwordText) {
    const match = bcrypt.compareSync(passwordText, this.password);
    return match;
  }

  return User;
};
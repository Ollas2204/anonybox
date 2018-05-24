'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is invalid'
        },
        async isEmailUnique(email) {
          const user = await User.findOne({ where : { email }});
          if (user && +this.id !== user.id) {
            throw new Error('Email has been taken');
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        async isUsernameUnique(username) {
          const user = await User.findOne({ where : { username }});
          if (user && +this.id !== user.id) {
            throw new Error('Username has been taken');
          }
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        const password = user.password;
        const hash = bcrypt.hashSync(password, 8);
        user.password = hash;
      },
      beforeUpdate: (user, option) => {
        const previousData = user._previousDataValues
        if (previousData.password !== user.password) {
          const password = user.password;
          const hash = bcrypt.hashSync(password, 8);
          user.password = hash;
        }
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
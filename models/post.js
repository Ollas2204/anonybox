'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    UserId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    hooks:{
      beforeCreate:(post,options)=>{
        let contents = post.content.split('\n')
        for(let i = 0; i < contents.length;i++){
          contents[i] =  `<p>${contents[i]}</p>`
        }
        console.log(contents)
        post.content = contents.join('')
      }
    }
  });
  
  Post.associate = function(models) {
    Post.belongsToMany(models.User, {
      through: 'Comments'
    });

    Post.belongsTo(models.User);
  };

  return Post;
};
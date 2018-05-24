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
        post.content = contents.join('')
      },
      beforeBulkUpdate:(post,options)=>{
        let contents = post.attributes.content.split('\n')
        for(let i = 0; i < contents.length;i++){
          contents[i] =  `<p>${contents[i]}</p>`
        }
        post.attributes.content = contents.join('')
        console.log('postpost',post)
      }
    }
  });
  
  Post.associate = function(models) {
    // Post.belongsToMany(models.User, {
    //   through: 'Comments'
    // });
    Post.belongsToMany(models.Tag,{
      through:'PostsTags'
    })
    Post.hasMany(models.Comment)
    Post.belongsTo(models.User);
  };


  Post.prototype.cleanFromTag = function(){
    let contentToClean = this.content.split('\r')
    for(let i = 0; i < contentToClean.length; i++){
      contentToClean[i] = contentToClean[i].split('<p>').join('')
      contentToClean[i] = contentToClean[i].split('</p>').join('')
      if(contentToClean[i]===''){
        contentToClean[i] = '\n'
      }
    }
    if(contentToClean.length > 1){
      for(let i = 0; i < contentToClean.length-1;i++){
        if(contentToClean[i]!=='\n')contentToClean[i]+='\n'
      }
    }
    return contentToClean.join('')
  }

  return Post;
};
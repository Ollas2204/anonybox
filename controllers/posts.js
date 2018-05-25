const { Post, Tag, PostsTag } = require('./../models');

exports.addPost = (req, res) => {
  const newPost = {
    content:req.body.content,
  }
  newPost.UserId = req.session.userId
  return Post.create(newPost).then(post => {
    let tag = req.body.tags.split(' ')
    let inputTags = (i) =>{
      if(i<tag.length){
        Tag.findOne({where:{name:tag[i]}})
        .then(tagFound=>{
          if(tagFound){
            tagRelation ={
              PostId:post.id,
              TagId:tagFound.id
            }
            PostsTag.create(tagRelation)
            .then(()=>{
              return inputTags(i+1)
            })
          }else{
            Tag.create({name:tag[i]})
            .then(tagCreated=>{
              tagRelation = {
                PostId:post.id,
                TagId:tagCreated.id
              }
              PostsTag.create(tagRelation)
              .then(()=>{
                return inputTags(i+1)
              })
            })
          }
        })
      }else{
        req.flash('success', 'Post added successfully');
        res.redirect('back')
      }
    }
    inputTags(0)
  });
};

exports.updatePost = (req, res) => {
  const updatePost = {
    content : req.body.content
  };
  const postId = req.params.postId;
  return Post.update(updatePost,{ where:{ id: postId }}).then(post => {
    req.flash('success', 'Post updated successfully');
    res.redirect('back')
  });
};

exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  return PostsTag.findAll({where:{PostId:postId}}).then(tags=>{
    PostsTag.destroy({where:{PostId:postId}})
    .then(()=>{
      let inputTags = (i) =>{
        if(i<tags.length){
          PostsTag.findOne({where:{TagId:tags[i].TagId}})
          .then(relationFound=>{
            if(relationFound){
                return inputTags(i+1)
            }else{
              Tag.destroy({where:{id:tags[i].TagId}})
              .then(()=>{
                return inputTags(i+1)
              })
            }
          })
        }else{
          Post.destroy({ where:{ id: postId }, individualHooks: true }).then(post =>{
              req.flash('success', 'Post deleted successfully');
              res.redirect('back')
          });
        }
      }
      inputTags(0)
    })
  })
};

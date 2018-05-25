const { User, Post, Comment, Tag } = require('./../models');

exports.showHomePage = (req,res)=>{
  let sortBy = 'createdAt';
  return Post.findAll({
    include: [User,Comment,Tag],
    order: [[sortBy, 'DESC']]
  }).then(posts=>{
    posts.forEach(element => {
      element.cleanTag=element.cleanFromTag()
    });
    if (req.query.sortBy === 'popularity') {
      posts.sort((a,b) => {
        return a.Comments.length < b.Comments.length
      });
    }
    if (req.query.sortBy === 'updatedAt'){
      posts.sort((a,b) => {
        return a.updatedAt < b.updatedAt
      });
      console.log(posts)
    }
    res.render('index',{ userId:req.session.userId,posts, page: 'home' , statusURL:''});
  });
}

exports.searchTag = (req,res)=>{
  let searchTag = req.query.searchTag
  if(searchTag.trim() === '') res.redirect('/')
  return Tag.findOne({include:[Post],where:{name:req.query.searchTag}})
  .then(Tags=>{
    if(Tags!==undefined){
      let getPosts = (i) =>{
        if(i<Tags.Posts.length){
          Post.findOne({include:[User,Comment,Tag],where:{id:Tags.Posts[i].id}})
          .then(postFound=>{
            Tags.Posts[i] = postFound
            return getPosts(i+1)
          })
        }else{
          Tags.Posts.sort((a,b) => {
            return b.createdAt > a.createdAt
          });
          res.render('index',{ userId:req.session.userId, page: 'home', posts:Tags.Posts, statusURL:'searching' })
        }
      }
      if (Tags) {
        getPosts(0)
      } else {
        req.flash('error', 'Tags not found');
        res.redirect('back');
      }
    }
  })
}
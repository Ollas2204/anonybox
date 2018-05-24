const { Post, Comment } = require('./../models');

exports.showHomePage = (req,res)=>{
  let sortBy = 'updatedAt';
  Post.findAll({
    include: [Comment],
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

    res.render('index',{ userId:req.session.userId,posts, page: 'home' });
  });
}
const { User, Post, Comment, Tag } = require('./../models');

exports.showRegisterPage = (req, res) => {
  res.render('registerForm');
};

exports.registerUser = (req, res) => {
  const fields = req.body;
  const newUser = { 
    username: fields.username, 
    email: fields.email,
    password: fields.password
  };

  return User.create(newUser)
    .then(result => res.redirect('/login'))
};

exports.showLoginPage = (req, res) => {
  res.render('loginForm');
};

exports.showProfilePage = (req, res) => {
  const { userId } = req.params;
      Post
      .findAll({
        include:[Comment,Tag],
        order:[['createdAt','DESC']],
        where:{UserId:req.session.userId}})
        .then(posts =>{
          posts.forEach(element => {
            let tagArray = []
            element.cleanTag=element.cleanFromTag()
            element.Tags.forEach(tag=>{
              tagArray.push(tag.name)
            })
            tagArray = tagArray.join(' ')
            element.tagArray = tagArray
          });
      res.render('profile', { posts: posts })
    });
};

exports.showEditPage = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      res.render('edit-user', { user : user });
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  updatedUser.id = userId;
  if (!updatedUser.password) delete updatedUser.password;
  User.update(updatedUser, { where : { id : userId }})
    .then(result => res.redirect(`/${userId}/edit`));
};
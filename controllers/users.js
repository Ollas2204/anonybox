const { User, Post, Comment } = require('./../models');

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
    .then(result => { 
      req.flash('success', "You've registered successfully, Please Login");
      res.redirect('/login');
    })
};

exports.showLoginPage = (req, res) => {
  res.render('loginForm');
};

exports.showProfilePage = (req, res) => {
  const { userId } = req.params;
  Post.findAll({ include: [Comment], where:{ UserId: userId }})
    .then(posts =>{
      res.render('profile', { posts, page: 'profile' })
    });
};

exports.showEditPage = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      res.render('editUser', { user });
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const updatedUser = {
    email: req.body.email,
    username: req.body.username,
  };
  if (req.body['new-password']) {
    updatedUser.password = req.body['new-password'];
  }

  updatedUser.id = userId;
  return User.update(updatedUser, { where : { id : userId }, individualHooks: true})
    .then(result => {
      req.session.username = updatedUser.username;
      req.flash('success', 'You have update you data successfully');
      res.redirect('back');
    });
};

exports.deleteUser = (req, res) => {

}
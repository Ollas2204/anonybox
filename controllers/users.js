const { User, Post } = require('./../models');

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

  User.create(newUser)
    .then(result => res.redirect('/login'));
};

exports.showLoginPage = (req, res) => {
  res.render('loginForm');
};

exports.showProfilePage = (req, res) => {
  const { userId } = req.params;
  User.findOne({ 
    where : { id : userId },
    include: [Post]
  })
    .then(user => {
      user.Posts.forEach(element => {
        element.cleanTag=element.cleanFromTag()
      });
      res.render('profile', { posts: user.Posts })
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
  if (!updatedUser.password) delete updatedUser.password;
  User.update(updatedUser, { where : { id : userId }})
    .then(result => res.redirect(`/${userId}/edit`));
};
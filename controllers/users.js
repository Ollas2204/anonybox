const User = require('./../models').User;

exports.showRegisterPage = (req, res) => {
  res.render('register');
};

exports.registerUser = (req, res) => {
  const fields = req.body;
  const newUser = { 
    username: fields.username, 
    email: fields.email,
    password: fields.password
  };

  User.create(newUser)
    .then(result => res.redirect('/users/login'));
};

exports.showLoginPage = (req, res) => {
  res.render('login-user');
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
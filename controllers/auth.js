const User = require('./../models').User;

exports.loginUser = (req, res) => {
  const username = req.body.username;
  const passwordText = req.body.password;
  User.findOne({ where : { username }})
    .then(user => {
      if (user) {
        const match = user.checkPassword(passwordText);
        if (match) {
          req.session.username = user.username;
          res.redirect('/dashboard');
        } else {
          res.redirect('/users/login');
        }
      } else {
        res.redirect('/users/login');
      }
    });
}

exports.logoutUser = (req, res) => {
  if (req.session.username) {
    delete req.session.username;
    res.send('logout');
  } else {
    res.redirect('/users/login');
  }
}


const User = require('./../models').User;

exports.loginUser = (req, res) => {
  const username = req.body.username;
  const passwordText = req.body.password;
  return User.findOne({ where : { username }})
    .then(user => {
      if (user) {
        const match = user.checkPassword(passwordText);
        if (match) {
          req.session.username = user.username;
          req.session.userId = user.id;
          req.flash('success', "You've logged in successfully")
          res.redirect(`/users/${user.id}`);
        } else {
          req.flash('error', 'Wrong username / password')
          res.redirect('/login');
        }
      } else {
        req.flash('error', 'Wrong username / password')
        res.redirect('/login');
      }
    });
}

exports.logoutUser = (req, res) => {
  if (req.session.username) {
    delete req.session.username;
    delete req.session.id;
    req.flash('success', "You've logged out successfully")
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
}


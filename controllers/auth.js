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
          req.session.userId = user.id;
          res.redirect(`/users/${user.id}`);
        } else {
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
    });
}

exports.logoutUser = (req, res) => {
  if (req.session.username) {
    delete req.session.username;
    delete req.session.id;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
}


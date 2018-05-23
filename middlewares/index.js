exports.validateRegister = (req, res, next) => {
  const newUser = req.body;
  if (newUser.password === newUser['password-confirm']) {
    next();
  } else {
    res.redirect('/users/register');
  }
}

exports.isLoggedIn = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/users/login');
  }
}
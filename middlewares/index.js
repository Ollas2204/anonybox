exports.validateRegister = (req, res, next) => {
  const errors = [];
  const body = req.body;
  if (!body.email) {
    errors.push({
      error: 'Email is empty',
      msg: 'Email is required'
    });
  }

  if (!body.username) {
    errors.push({
      error: 'Username is empty',
      msg: 'Username is required'
    });
  }

  if (!body.password) {
    errors.push({
      error: 'Password is empty',
      msg: 'Password cannot be blank'
    });
  }

  if (!body['password-confirm']) {
    errors.push({
      error: 'Confirmed Password is empty',
      msg: 'Confirmed Password cannot be blank'
    });
  }

  if (body.password.length < 6) {
    errors.push({
      error: 'Password too short',
      msg: 'Password must be at least 6 characters long'
    });
  } 

  if (body.password !== body['password-confirm']) {
    errors.push({
      error: 'Confirmed Password is empty',
      msg: 'Confirmed Password cannot be blank'
    });
  }

  if (errors.length > 0) {
    req.flash('error', errors.map(err => err.msg));
    res.render('registerForm', { body : req.body, flashes: req.flash() });
    return;
  }

  next();
}

exports.isLoggedIn = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    req.flash('error', 'You must log in to do that!');
    res.redirect('/login');
  }
}

exports.isLoggedOut = (req, res, next) => {
  if (!req.session.username) {
    next();
  } else {
    res.redirect('/');
  }
}
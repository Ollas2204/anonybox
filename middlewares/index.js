const { User } = require('./../models');

exports.validateRegister = (req, res, next) => {
  const errors = [];
  const body = {...req.body};
  Object.keys(body).forEach(key => {
    body[key] = body[key].trim();
  });
  
  if (!body.email) {
    errors.push({
      error: 'Email is empty',
      msg: 'Email is required'
    });
  }

  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    errors.push({
      error: 'Invalid Email Format',
      msg: 'Invalid Email Format'
    });
  }

  if (!body.username) {
    errors.push({
      error: 'Username is empty',
      msg: 'Username is required'
    });
  }

  if (body.username.length < 6) {
    errors.push({
      error: 'Username is too short',
      msg: 'Username must be at least 6 characters long'
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
      error: 'Passwords do not match',
      msg: 'Passwords do not match'
    });
  }

  if (errors.length > 0) {
    req.flash('error', errors.map(err => err.msg));
    res.render('registerForm', { body : req.body, flashes: req.flash() });
    return;
  }

  next();
}

exports.validateUserUpdate = async (req, res, next) => {
  const errors = [];
  const body = {...req.body};
  Object.keys(body).forEach(key => {
    body[key] = body[key].trim();
  });

  if (!body.email) {
    errors.push({
      error: 'Email is empty',
      msg: 'Email is required'
    });
  }

  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    errors.push({
      error: 'Invalid Email Format',
      msg: 'Invalid Email Format'
    });
  }

  if (!body.username) {
    errors.push({
      error: 'Username is empty',
      msg: 'Username is required'
    });
  }

  if (body.username.length < 6) {
    errors.push({
      error: 'Username is too short',
      msg: 'Username must be at least 6 characters long'
    });
  }

  if (body['new-password']) {
  
    if (!body['new-password-confirm']) {
      errors.push({
        error: 'Confirmed Password is empty',
        msg: 'Confirmed Password cannot be blank'
      });
    }
  
    if (body['new-password'].length < 6) {
      errors.push({
        error: 'NewPassword too short',
        msg: 'New Password must be at least 6 characters long'
      });
    } 
  
    if (body['new-password'] !== body['new-password-confirm']) {
      errors.push({
        error: 'Passwords do not match',
        msg: 'Passwords do not match'
      });
    }

    const currentUser = await User.findById(req.session.userId);
    const oldPasswordMatch = await currentUser.checkPassword(body['old-password']);
    if (!oldPasswordMatch) {
      errors.push({
        error: 'Old Password is wrong',
        msg: 'Old Password is wrong'
      });
    }
  }

  if (errors.length > 0) {
    req.flash('error', errors.map(err => err.msg));
    res.render('editUser', { user : req.body, flashes: req.flash() });
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

exports.isCredetialSame = (req, res, next) => {
  const { userId } = req.params;
  if (req.session.userId === +userId) {
    next();
  } else {
    req.flash('error', 'You do not have authorization to do that!');
    res.redirect('back');
  }
}
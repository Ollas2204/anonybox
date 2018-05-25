exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  }
}

exports.notFound = (req, res, next) => {
  const err = new Error('Your page is missing somewhere in the galaxy');
  err.status = 404;
  next(err);
}

exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach(key => req.flash('error', err.errors[key].message));
  res.redirect('back');
}

exports.showErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status !== 404) err.message = 'Blame Justin for being a barbarian ';
  console.log(err);
  res.render('errors', {
    title: err.message,
    message: err.message,
    status: err.status || 500
  });
};
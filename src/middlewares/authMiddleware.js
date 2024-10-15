const auth = function (req, res, next) {
  const authValue = req.cookies['x-gallery-session'];
  if (authValue !== '1111') {
    return next('router');
  }
  next();
};

export default auth;

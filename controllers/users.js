const User = require('../models/user');
const Plant = require('../models/myPlants');

module.exports.registerForm = (req, res) => {
  res.render('users/register');
};

module.exports.newUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Planties!');
      res.redirect('/plants');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

module.exports.loginForm = (req, res) => {
  res.render('users/login');
};

module.exports.login = (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectURL = req.session.returnTo || '/plants';
  delete req.session.returnTo;
  console.log('ICI', req.session);
  res.redirect(redirectURL);
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
  req.flash('success', 'Goodbye!');
  res.redirect('/');
};

module.exports.myCollection = async (req, res) => {
  const usersPlants = await Plant.find({ owner: req.user });
  res.render('users/userIndex', { usersPlants, family: 'My Collection' });
};

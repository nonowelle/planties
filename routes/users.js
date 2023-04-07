const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { isLoggedIn, isOwner } = require('../middleware');
const users = require('../controllers/users');

router
  .route('/register')
  .get(users.registerForm)
  .post(catchAsync(users.newUser));

router
  .route('/login')
  .get(users.loginForm)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    users.login
  );

router.get('/logout', users.logout);

//MY COLLECTION
router.get('/mycollection', isLoggedIn, catchAsync(users.myCollection));

module.exports = router;

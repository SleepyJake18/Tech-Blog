const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const path = require(`path`);

router.get('/', async (req, res) => {
  try {
    res.render(`homepage`);
 //what would we like to show on our homepage?
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get(`/signup`, (req, res) => {

  if (req.session.logged_in) {
    res.redirect(`/`);
    return;
  }

  res.render(`signup`);
});
module.exports = router;

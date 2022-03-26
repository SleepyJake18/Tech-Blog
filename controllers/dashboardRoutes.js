const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const path = require(`path`);
// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    let posts = {};
    //let comments = {};
    const postData = await Post.findAll({include: [{model:Comment}]});
    posts = postData.map((post) => post.get({plain:true}));
    res.render(`dashboard`, {
      posts
    });
 //what would we like to show on our homepage?
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/new', withAuth, async (req, res) => {
    try {
      res.render(`create-post`);
   //what would we like to show on our homepage?
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      res.render(`edit-post`);
   //what would we like to show on our homepage?
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/post/:id', withAuth, async (req, res) => {
    try {
      res.render(`one-post`);
   //what would we like to show on our homepage?
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const path = require(`path`);
// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    let posts = {};
    //let comments = {};
    const postData = await Post.findAll({include: [{model:Comment, include: [{model:User}]}, {model:User}]});
    posts = postData.map((post) => post.get({plain:true}));
    console.log(posts);
    res.render(`dashboard`, {
      posts,
     logged_in: req.session.logged_in
    });
 //what would we like to show on our homepage?
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/new', withAuth, async (req, res) => {
    try {
      res.render(`create-post`, {
        logged_in: req.session.logged_in
      });
   //what would we like to show on our homepage?
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      let editPost = {};
      const editPostData = await Post.findByPk(req.params.id,
      {include: [{model:User}]});
      console.log(editPostData);
      editPost = editPostData.get(({plain:true}));
      res.render(`edit-post`, {
        editPost,
        logged_in: req.session.logged_in
      });
   //what would we like to show on our homepage?
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/post/:id', withAuth, async (req, res) => {
    try {

      let singlePost = {};
      //let comments = {};
      const singlePostData = await Post.findByPk(req.params.id, {include: [{model:Comment, include: [{model:User}]}, {model:User}]});
      console.log(singlePostData);
      singlePost = singlePostData.get(({plain:true}));
      res.render(`one-post`, {
        singlePost,
        logged_in: req.session.logged_in
      });
      //what would we like to show on our homepage?
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/edit/comment/:id', withAuth, async (req, res) => {
    try {
      let editComment = {};
      const editCommentData = await Comment.findByPk(req.params.id,
      {include: [{model:User}]});
      console.log(editCommentData);
      editComment = editCommentData.get(({plain:true}));
      res.render(`edit-comment`, {
        editComment,
        logged_in: req.session.logged_in
      });
   //what would we like to show on our homepage?
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
//POST to create new user
//when creating a new user, dont forget to HASH the password => controlled by our user model (hooks)
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email.toLowerCase() } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(dbUserData);
    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    })
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(500).end();
  }
});

router.post('/new/post', async (req,res) => {
  try{
    console.log(req.body);
    const newPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    console.log(newPostData);
    req.session.save(() => {
      res.status(200).json(newPostData);
    })
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put('/edit/post/:id', async (req,res) => {
  try{
    console.log(req.body);
    const editPostData = await Post.update({
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
    );
    console.log(editPostData);
      res.status(200).json(editPostData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/new/comment', async (req,res) => {
  try{
    console.log(req.body);
    const newCommentData = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.comment_id
    },
    );
    console.log(newCommentData);
    req.session.save(() => {
      res.status(200).json(newCommentData);
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put('/edit/comment/:id', async (req,res) => {
  try{
    console.log(req.body);
    const newCommentData = await Comment.update({
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
    );
    console.log(newCommentData);
      res.status(200).json(newCommentData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete('/post/delete/:id', (req, res) => {
  // Looks for the books based book_id given in the request parameters
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedPost) => {
      res.json(deletedPost);
    })
    .catch((err) => res.json(err));
});

router.put('/comment/delete/:id', (req, res) => {
  // Looks for the books based book_id given in the request parameters
  console.log(req.params.id)
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedComment) => {
      res.json(deletedComment);
    })
    .catch((err) => res.json(err));
});

module.exports = router;

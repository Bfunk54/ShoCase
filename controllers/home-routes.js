const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [ { model: User } ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('all-posts', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get single post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id 
            },
            include: [ { model: User }, { model: Post }]
        });

        const postData = await Post.findByPk(req.params.id, {
            include: [ { model: User } ],
        });
        
        const post = postData.get({ plain: true });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('single-post', {
            ...post,
            comments,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;
const router = require('express').Router();
const { Playlist, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        // const playlistData = await Playlist.findAll({
        //     include: [ { model: User } ],
        // });

        // // Serialize data so the template can read it
        // const playlists = playlistData.map((playlist) => playlist.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('all-posts', {
            // playlists,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get single post
router.get('/playlist/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id 
            },
            include: [ { model: User }, { model: Playlist }]
        });

        const playlistData = await Playlist.findByPk(req.params.id, {
            include: [ { model: User } ],
        });
        
        const playlist = playlistData.get({ plain: true });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('single-post', {
            ...playlist,
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
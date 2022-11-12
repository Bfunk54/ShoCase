const router = require('express').Router();
const { Playlist, Comment, User, Anime } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const playlistData = await Playlist.findAll({
            include: [ { model: User }, {model: Anime} ],
        });

        // Serialize data so the template can read it
        const playlists = playlistData.map((playlist) => playlist.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('all-playlists', {
            playlists,
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
                playlist_id: req.params.id 
            },
            include: [ { model: User }, { model: Playlist, include: [ { model: User }, { model: Anime } ] } ],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('single-playlist', {
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
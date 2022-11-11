const router = require('express').Router();
const { Playlist, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        const playlistData = await Playlist.findAll({
            include: [ { model: User } ],
        });
        const playlists = playlistData.map((playlist) => playlist.get({ plain: true }));
        res.render('all-playlists', { playlists, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get playlists by search
router.get('/playlists/search', (req, res) => {
    const term  = req.body.searchText;
    Playlist.findAll({ where: { title: { [Op.like]: '%' + term + '%' } } })
     .then(playlists => res.render('all-playlists', { playlists }))
     .catch(err => console.log(err))
});

// get single playlist by id
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
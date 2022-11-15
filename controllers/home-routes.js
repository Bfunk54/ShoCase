const router = require('express').Router();
const { Playlist, Comment, User, Anime, Favorites } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// get all playlists for homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const playlistData = await Playlist.findAll({
            include: [{ model: User }, { model: Anime }, {model: Favorites}],
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Favorites AS favorites
                            WHERE
                                playlist.id = playlist_id
                        )`),
                        'favoritesCount'
                    ]
                ]
            }
        });

        
        // Serialize data so the template can read it
        const playlists = playlistData.map((playlist) => playlist.get({plain: true}));

     
        // Pass serialized data and session flag into template
        res.render('all-playlists', {
            playlists,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get playlists by search
router.get('/playlists/search/:search', async (req, res) => {
    try {
    const playlistData = await Playlist.findAll({ where: { title: { [Op.like]: '%' + req.params.search + '%' } } })
    const playlists = playlistData.map((playlist) => playlist.get({ plain: true }))
     res.render('playlist-search', { playlists, loggedIn: req.session.loggedIn })
    }catch(err) {
        res.status(500).json(err);
    }
});

// get single playlist by id
router.get('/playlist/:id', withAuth, async (req, res) => {
    try {
        const playlistData = await Playlist.findByPk(req.params.id, {
            include: [ { model: User }, {model: Anime}, {model:Comment, include: [{model:User}]} ]
          });

          const playlist = playlistData.get({ plain: true });

        res.render('single-playlist', {
            ...playlist,
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

router.get('/create-playlists', withAuth, (req, res) => {
    res.render('create-playlists');
});
 
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/about-us', (req, res) => {
    res.render('about-us', {
        loggedIn: req.session.loggedIn
    });
});
module.exports = router;
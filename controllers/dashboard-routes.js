const router = require('express').Router();
const { Playlist, Comment, User, Favorites, Anime } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get all posts for homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const playlistData = await Playlist.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: User, include: [{ model: Favorites, include: [{ model: Playlist }] }] }, { model: Anime }, { model: Favorites }],
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
                    ],
                    [
                        Sequelize.literal(`(
                                          SELECT COUNT(*) FROM Favorites AS checks WHERE playlist.id = playlist_id AND ${req.session.user_id} = user_id
                                      )`),
                        "hasFavorited",
                    ]
                ]
            }
        });

        const playlistsU = playlistData.map((playlist) => playlist.get({ plain: true }));
        const playlists = playlistsU.reverse()
        const user = playlists[0].user;

        const currentUser = {
            user_id: req.session.user_id,
            email: req.session.email,
            avatar: req.session.avatar,
            username: req.session.username
        }

        res.render('dashboard', {
            currentUser,
            playlists,
            user,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        try {
            const currentUser = {
                user_id: req.session.user_id,
                email: req.session.email,
                avatar: req.session.avatar,
                username: req.session.username
            }
            
            res.render('dashboard', {
                currentUser,
                loggedIn: req.session.loggedIn
            })
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

module.exports = router;
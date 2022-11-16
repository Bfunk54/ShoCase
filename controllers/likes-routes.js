const router = require('express').Router();
const { Playlist, Comment, User, Favorites, Anime } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Favorites }, { model: Playlist }],
        });
        
        const user = userData.get({ plain: true });
        const playlistIdHolder = [];
        user.favorites.forEach(favorite => playlistIdHolder.push(favorite.playlist_id))

        
        
        const playlistData = await Playlist.findAll({
            where: {
                id: playlistIdHolder
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
                      ],
                ]
            }
        });

        const playlistsU = playlistData.map((playlist) => playlist.get({plain: true}));  
        const playlists = playlistsU.reverse()
        const currentUser = {
            user_id: req.session.user_id,
            email: req.session.email,
            avatar: req.session.avatar,
            username: req.session.username
          }

        res.render('likes', {
            currentUser,
            playlists,
            user,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;

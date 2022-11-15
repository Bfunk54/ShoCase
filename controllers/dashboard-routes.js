const router = require('express').Router();
const { Playlist, Comment, User, Favorites, Anime } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get all posts for homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const playlistData = await Playlist.findAll({
            include: [{ model: User, include: [{ model: Favorites, include: [{ model: Playlist }] }] }, { model: Anime }, {model: Favorites}],
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

        const playlists = playlistData.map((playlist) => playlist.get({plain: true}));
        const user = playlists[0].user;

        res.render('dashboard', {
            playlists,
            user,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get single post
// router.get('/post/:id', withAuth, async (req, res) => {
//     try {
//         const commentData = await Comment.findAll({
//             where: {
//                 post_id: req.params.id 
//             },
//             include: [ { model: User }, { model: Post }]
//         });

//         const postData = await Post.findByPk(req.params.id, {
//             include: [ { model: User } ],
//         });

//         const post = postData.get({ plain: true });

//         const comments = commentData.map((comment) => comment.get({ plain: true }));

//         res.render('single-post', {
//             ...post,
//             comments,
//             loggedIn: req.session.loggedIn
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;
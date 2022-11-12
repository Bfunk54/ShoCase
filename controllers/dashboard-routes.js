const router = require('express').Router();
const { Playlist, Comment, User, Favorites } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [ { model: Playlist }, {model: Favorites, include: [{model:Playlist}]} ]
          });

          const user = userData.get({ plain: true });
          console.log(user)
        res.render('dashboard', {
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
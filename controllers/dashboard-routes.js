const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id 
            },
            include: [ { model: User } ]
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('dashboard', {
            posts,
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
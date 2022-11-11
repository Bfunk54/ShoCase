const router = require('express').Router();

const userRoutes = require('./user-routes');
const playlistRoutes = require('./playlist-routes.js');
const commentRoutes = require('./comment-routes.js');
const animeRoutes = require('./anime-routes')

router.use('/users', userRoutes);
router.use('/post', playlistRoutes);
router.use('/comment', commentRoutes);
router.use('/anime', animeRoutes);

module.exports = router;
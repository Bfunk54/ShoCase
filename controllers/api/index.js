const router = require('express').Router();

const userRoutes = require('./user-routes');
const playlistRoutes = require('./playlist-routes.js');
const commentRoutes = require('./comment-routes.js');
const animeRoutes = require('./anime-routes')

router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);
router.use('/comments', commentRoutes);
router.use('/animes', animeRoutes);

module.exports = router;
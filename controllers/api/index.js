const router = require('express').Router();

const userRoutes = require('./user-routes');
const playlistRoutes = require('./playlist-routes.js');
const commentRoutes = require('./comment-routes.js');
const animeRoutes = require('./anime-routes')
const favoriteRoutes = require('./favorites-routes')

router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);
router.use('/comments', commentRoutes);
router.use('/animes', animeRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;
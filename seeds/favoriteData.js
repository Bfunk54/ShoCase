const { Favorites } = require('../models');

const favoriteData = [
  {
    user_id: 1,
    playlist_id: 3,
  },
  {
    user_id: 1,
    playlist_id: 2,
  },
  {
    user_id: 2,
    playlist_id: 1,
  },
  {
    user_id: 2,
    playlist_id: 3,
  },
  {
    user_id: 3,
    playlist_id: 2,
  },
  {
    user_id: 3,
    playlist_id: 1,
  },
];

const seedFavorites = () => Favorites.bulkCreate(favoriteData);

module.exports = seedFavorites;
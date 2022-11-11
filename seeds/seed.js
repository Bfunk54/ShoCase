const sequelize = require('../config/config');
const seedUsers = require('./userData.js');
const seedPlaylists = require('./playlistData.js');
const seedComments = require('./commentData.js');
const seedFavorites = require('./favoriteData.js');
const seedAnimes = require('./animeData.js');
const seedAnimePlaylists = require('./animePlaylistData.js')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPlaylists();

  await seedComments();

  await seedFavorites();

  await seedAnimes();

  await seedAnimePlaylists();

  process.exit(0);
};

seedAll();

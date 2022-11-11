const sequelize = require('../config/config');
const seedUsers = require('./userData.js');
const seedPlaylists = require('./playlistData.js');
const seedComments = require('./commentData.js');
const seedFavorites = require('./favoriteData.js')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPlaylists();

  await seedComments();

  await seedFavorites();

  process.exit(0);
};

seedAll();

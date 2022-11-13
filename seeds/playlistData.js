const { Playlist } = require('../models');

const playlistData = [
  {
    title: 'Summer 2022 Anime',
    user_id: 1,
  },
  {
    title: 'Winter 2010 Anime',
    user_id: 2,
  },
  {
    title: 'Fall 2015 Anime',
    user_id: 3,
  },
  {
    title: 'Spring 2042 Anime',
    user_id: 3,
  },
  {
    title: 'Random Anime',
    user_id: 3,
  },
];

const seedPlaylists = () => Playlist.bulkCreate(playlistData);

module.exports = seedPlaylists;
const { AnimePlaylist } = require('../models');

const animePlaylistData = [
  {
    playlist_id: 1,
    anime_id: 1,
  },
  {
    playlist_id: 1,
    anime_id: 2,
  },
  {
    playlist_id: 1,
    anime_id: 3,
  },
  {
    playlist_id: 1,
    anime_id: 4,
  },
  {
    playlist_id: 2,
    anime_id: 1,
  },
  {
    playlist_id: 2,
    anime_id: 2,
  },
  {
    playlist_id: 2,
    anime_id: 3,
  },
  {
    playlist_id: 2,
    anime_id: 4,
  },
  {
    playlist_id: 3,
    anime_id: 1,
  },
  {
    playlist_id: 3,
    anime_id: 2,
  },
  {
    playlist_id: 3,
    anime_id: 3,
  },
  {
    playlist_id: 3,
    anime_id: 4,
  },
  {
    playlist_id: 4,
    anime_id: 1,
  },
  {
    playlist_id: 4,
    anime_id: 2,
  },
  {
    playlist_id: 4,
    anime_id: 3,
  },
  {
    playlist_id: 4,
    anime_id: 4,
  },
  {
    playlist_id: 5,
    anime_id: 1,
  },
  {
    playlist_id: 5,
    anime_id: 2,
  },
  {
    playlist_id: 5,
    anime_id: 3,
  },
  {
    playlist_id: 5,
    anime_id: 4,
  },
];

const seedAnimePlaylists = () => AnimePlaylist.bulkCreate(animePlaylistData);

module.exports = seedAnimePlaylists;
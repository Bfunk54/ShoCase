const { Comment } = require('../models');

const commentData = [
  {
    content: 'Whoa this playlist is so good!',
    user_id: 1,
    playlist_id: 2,
  },
  {
    content: 'Ugh... all these animes suck',
    user_id: 2,
    playlist_id: 3,
  },
  {
    content: 'I mean... these are alriiiiight. But have you seen Avatar the last Airbender!',
    user_id: 3,
    playlist_id: 1,
  },
  {
    content: 'these are alriiiiight. But have you seen Avatar the last Airbender!',
    user_id: 2,
    playlist_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
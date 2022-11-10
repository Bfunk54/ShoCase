const { Comment } = require('../models');

const commentData = [
  {
    content: 'I have no idea where Im commenting',
    user_id: 1,
    post_id: 2,
  },
  {
    content: 'Is this comment working???',
    user_id: 2,
    post_id: 3,
  },
  {
    content: 'Whoa you can make comments!',
    user_id: 3,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
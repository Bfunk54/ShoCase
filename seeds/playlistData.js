const { Post } = require('../models');

const postData = [
  {
    title: 'Whoa look at this post!',
    content: 'This is the absolute coolest post ever. If I really had to define a cool post... it would most definitely be this one!',
    user_id: 1,
  },
  {
    title: 'Im happy today. Guess why!',
    content: 'Absolutely no way youll guess. No one has guessed correctly yet!',
    user_id: 2,
  },
  {
    title: 'My favorite anime',
    content: 'ALL OF THEM MUAHAHA',
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
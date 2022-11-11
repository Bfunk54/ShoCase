const { User } = require('../models');

const userData = [
  {
    username: 'foobar',
    email: 'foo@bar.com',
    password: 'foofoobarbar1',
    avatar: 1,
  },
  {
    username: 'littleLad',
    email: 'little@lad.com',
    password: 'littlelad2',
    avatar: 2,
  },
  {
    username: 'mateowallace',
    email: 'mateo@wallace.com',
    password: 'mateowallace3',
    avatar: 3,
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

// {
//   username: 'beepbeep',
//   email: 'beep@beep.com',
//   password: 'beepbeepbeep2',
//   avatar: 4,
// }
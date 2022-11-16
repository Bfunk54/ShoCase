const { User } = require('../models');

const userData = [
  {
    username: 'foobar',
    email: 'foo@bar.com',
    password: 'foofoobarbar1',
    avatar: 3,
  },
  {
    username: 'littleLad',
    email: 'little@lad.com',
    password: 'littlelad2',
    avatar: 2,
  },
  {
    username: 'tester',
    email: 'test@test.com',
    password: '$2b$10$AF2hAHz4o9rHl1PZzyG.DuYaKFyUDMHl4UFLzBCOpGPXB93MUAs76',
    // password: 'testtest',
    avatar: 1,
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
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'testing',
        password: '539bc3e5a6e11df7ef81bded8e7c2343',
        // senha: Testing12345
        accountId: 1
      },
      {
        id: 2,
        username: 'User',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        // senha: Secret_user
        accountId: 2
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

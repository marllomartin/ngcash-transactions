module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 11111,
        username: 'testing',
        password: '539bc3e5a6e11df7ef81bded8e7c2343',
        // senha: Testing12345
        accountId: 11111
      },
      {
        id: 22222,
        username: 'testing_twin',
        password: '280faf6d7b0621c0b5ac57200308461e',
        // senha: Secret_user
        accountId: 22222
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

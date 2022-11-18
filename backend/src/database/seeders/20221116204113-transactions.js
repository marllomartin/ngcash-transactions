module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transactions', [
      {
        id: 11111,
        debitedAccountId: 11111,
        creditedAccountId: 22222,
        value: 20.45,
        createdAt: '2022-11-17T18:33:41.700Z'
      },
      {
        id: 22222,
        debitedAccountId: 22222,
        creditedAccountId: 11111,
        value: 14.65,
        createdAt: '2022-11-17T18:33:41.700Z'
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};

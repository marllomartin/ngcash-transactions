module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transactions', [
      {
        id: 1,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 20.45,
        createdAt: '2022-11-17T18:33:41.700Z'
      },
      {
        id: 2,
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: 14.65,
        createdAt: '2022-11-17T18:33:41.700Z'
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};

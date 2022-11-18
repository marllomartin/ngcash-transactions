interface ITransaction {
  debitedAccountId: number,
  creditedAccountId: number,
  value: number
}

export default ITransaction;

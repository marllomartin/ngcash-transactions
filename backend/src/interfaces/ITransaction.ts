interface ITransaction {
  debitedAccountId: string,
  creditedAccountId: string,
  value: number
}

export default ITransaction;

interface Transaction {
  debitedAccountId: string,
  creditedAccountId: string,
  value: number
}

export default Transaction;

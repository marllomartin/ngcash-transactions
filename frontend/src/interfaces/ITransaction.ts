interface ITransaction {
  id: number,
  debitedAccountUsername: string,
  creditedAccountUsername: string,
  value: number,
  createdAt: string
}

export default ITransaction;

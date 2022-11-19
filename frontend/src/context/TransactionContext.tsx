import React, { createContext, useState } from "react";

export const TransactionContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

const TransactionProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState([]);

  return (
    <TransactionContext.Provider
      value={{
        loading, setLoading,
        transactions, setTransactions,
        balance, setBalance
      }}
    >
      {children}
    </TransactionContext.Provider>);
};

export default TransactionProvider;

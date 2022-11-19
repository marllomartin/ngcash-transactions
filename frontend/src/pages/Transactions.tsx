import React from 'react'
import LayoutTransactions from '../components/LayoutTransactions';
import TransactionProvider from '../context/TransactionContext';

const Login: React.FC = () => (
  <>
    <TransactionProvider>
      <LayoutTransactions />
    </TransactionProvider>
  </>
)

export default Login;
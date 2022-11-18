import React from 'react'
import { Container } from './styles'
import Menu from '../Menu'
import TransactionsList from '../TransactionsList';
import TransactionsCreate from '../TransactionsCreate';

const LayoutMain: React.FC = () => (
  <Container>
    <Menu />
    <TransactionsCreate />
    <TransactionsList />
  </Container>
)

export default LayoutMain;

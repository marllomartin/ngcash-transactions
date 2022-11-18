import React from 'react'
import { Container } from '../../styles/ContainerStyle';
import { Table } from './styles';

const TransactionsList: React.FC = () => (
  <Container>
    <header>Minhas Transferências</header>
    <Table>
      <thead>
        <tr>
          <th>Debited Account</th>
          <th>Credited Account</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nome</td>
          <td>Nome</td>
          <td>R$ 100.00</td>
          <td>01/01/2001</td>
        </tr>
        <tr>
          <td>Nome</td>
          <td>Nome</td>
          <td>R$ 100.00</td>
          <td>01/01/2001</td>
        </tr>
        <tr>
          <td>Nome</td>
          <td>Nome</td>
          <td>R$ 100.00</td>
          <td>01/01/2001</td>
        </tr>
        <tr>
          <td>Nome</td>
          <td>Nome</td>
          <td>R$ 100.00</td>
          <td>01/01/2001</td>
        </tr>
      </tbody>
    </Table>
  </Container>
)

export default TransactionsList;
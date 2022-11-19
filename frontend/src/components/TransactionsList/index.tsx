import React, { useCallback, useEffect, useState } from 'react'
import ClockLoader from 'react-spinners/ClockLoader';
import { getTransactions } from '../../services/api';
import { Container } from '../../styles/ContainerStyle';
import { LoaderContainer, NotFound, Table } from './styles';

const TransactionsList: React.FC = () => {

  const [userData] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadTransactions = useCallback(async () => {
    try {
      console.log(userData.token);
      setLoading(true);
      await getTransactions(userData.token)
        .then((res) => {
          setLoading(false);
          setTransactions(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [setTransactions, setLoading, userData]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);


  return (
    <Container>
      <header>Minhas Transferências</header>
      {loading ?
        <LoaderContainer>
          <ClockLoader color={"#8170F4"} />
        </LoaderContainer>
        :
        <>
          {transactions.length === 0 ?
            <NotFound>
              <p>{`Nenhuma transferência registrada :(`}</p>
            </NotFound> :
            <Table>
              <thead>
                <tr>
                  <th>Debited Account ID</th>
                  <th>Credited Account ID</th>
                  <th>Valor</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                {
                  transactions.map((transaction: any) => {
                    return (
                      <tr key={transaction.id}>
                        <td>{transaction.debitedAccountId}</td>
                        <td>{transaction.creditedAccountId}</td>
                        <td>R$ {transaction.value}</td>
                        <td>{transaction.createdAt}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          }
        </>
      }
    </Container>
  )
}

export default TransactionsList;
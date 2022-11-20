import React, { useCallback, useContext, useEffect, useState } from 'react'
import ClockLoader from 'react-spinners/ClockLoader';
import { TransactionContext } from '../../context/TransactionContext';
import { getAccountBalance, getTransactions } from '../../services/api';
import { Container } from '../../styles/ContainerStyle';
import SvgNgcashStar from '../../styles/svg/ngcash-star';
import { BalanceContainer, LoaderContainer, NotFound, StarContainer, Table } from './styles';

const TransactionsList: React.FC = () => {

  const [userData] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const {
    loading, setLoading,
    transactions, setTransactions,
    balance, setBalance
  } = useContext(TransactionContext);

  const loadTransactions = useCallback(async () => {
    try {
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

  const loadBalance = useCallback(async () => {
    try {
      await getAccountBalance(userData.token, userData.id)
        .then((res) => {
          setBalance(res.data.balance);
        });
    } catch (error) {
      console.log(error);
    }
  }, [setBalance, userData])

  useEffect(() => {
    loadTransactions();
    loadBalance();
  }, [loadTransactions, loadBalance]);


  return (
    <>
      <BalanceContainer>
        <StarContainer>
          <span>
            <SvgNgcashStar
            />
          </span>
          <span>{`Saldo:ㅤR$ ${balance}`}</span>
        </StarContainer>
      </BalanceContainer>
      <Container>
        <header>Minhas Transferências</header>
        {loading ?
          <LoaderContainer>
            <ClockLoader color={"black"} />
          </LoaderContainer>
          :
          <>
            {transactions.length === 0 ?
              <NotFound>
                <p>{`Você ainda não realizou nenhuma transferência :(`}</p>
              </NotFound> :
              <Table>
                <thead>
                  <tr>
                    <th>Usuário Debitado</th>
                    <th>Usuário Creditado</th>
                    <th>Valor</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    transactions.map((transaction: any) => {
                      return (
                        <tr key={transaction.id}>
                          <td>{transaction.debitedAccountUsername}</td>
                          <td>{transaction.creditedAccountUsername}</td>
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
    </>
  )
}

export default TransactionsList;

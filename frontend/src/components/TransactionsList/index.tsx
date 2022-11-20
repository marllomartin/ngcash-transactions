import React, { useCallback, useContext, useEffect, useState } from 'react'
import ClockLoader from 'react-spinners/ClockLoader';
import { TransactionContext } from '../../context/TransactionContext';
import ITransaction from '../../interfaces/ITransaction';
import { getAccountBalance, getTransactions } from '../../services/api';
import { Container } from '../../styles/ContainerStyle';
import SvgNgcashStar from '../../styles/svg/ngcash-star';
import { BalanceContainer, ButtonContainer, LoaderContainer, NotFound, StarContainer, Table } from './styles';

const TransactionsList: React.FC = () => {

  const [userData] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const {
    loading, setLoading,
    transactions, setTransactions,
    balance, setBalance
  } = useContext(TransactionContext);

  const [search, setSearch] = useState('');

  const filterTransactions = (transaction: ITransaction) => {
    if (search === "recebidas") {
      return transaction.creditedAccountUsername.includes(userData.username);
    }
    if (search === "realizadas") {
      return transaction.debitedAccountUsername.includes(userData.username)
    };
    return transaction;
  }

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

  const filteredTransactions = transactions.filter((transaction: ITransaction) => filterTransactions(transaction));


  return (
    <>
      <BalanceContainer>
        <StarContainer>
          <span>
            <SvgNgcashStar
            />
          </span>
          <p>{`${userData.username}`}</p>
          <span>{`saldo:ㅤR$ ${balance}`}</span>
        </StarContainer>
      </BalanceContainer>
      <Container>
        <header>Minhas Transferências</header>
        <ButtonContainer>
          <button
            onClick={() => setSearch('')}
            className={search === '' ? 'active' : ''}
          >
            todas
          </button>
          <button
            onClick={() => setSearch('realizadas')}
            className={search === 'realizadas' ? 'active' : ''}
          >
            realizadas
          </button>
          <button
            onClick={() => setSearch('recebidas')}
            className={search === 'recebidas' ? 'active' : ''}
          >
            recebidas
          </button>
        </ButtonContainer>
        {loading ?
          <LoaderContainer>
            <ClockLoader color={"black"} />
          </LoaderContainer>
          :
          <>
            {filteredTransactions.length === 0 ?
              <NotFound>
                <p>{`Você ainda não ${search !== "recebidas" ? "realizou" : "recebeu"} nenhuma transferência :(`}</p>
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
                    filteredTransactions
                      .map((transaction: ITransaction) => {
                        return (
                          <tr key={transaction.id}>
                            <td>{transaction.debitedAccountUsername}</td>
                            <td>{transaction.creditedAccountUsername}</td>
                            <td>R$ {transaction.value}</td>
                            <td>
                              {
                                String(new Date(transaction.createdAt).toLocaleDateString())
                              }
                            </td>
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

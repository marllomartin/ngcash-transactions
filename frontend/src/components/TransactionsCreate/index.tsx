import React, { useCallback, useContext, useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { TransactionContext } from '../../context/TransactionContext';
import { createTransaction, getAccountBalance, getTransactions } from '../../services/api';
import { Container } from '../../styles/ContainerStyle';
import { ButtonArea, Form, InputContainer, InputGroup } from './styles';

const TransactionsCreate: React.FC = () => {
  const [userData] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const {
    setLoading,
    setTransactions,
    setBalance
  } = useContext(TransactionContext);

  const [creditedUser, setCreditedUser] = useState<string>("");
  const [value, setValue] = useState<any>("");

  const [transactionError, setTransactionError] = useState<any>("");

  const handleChangeCreditedUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditedUser(event.target.value);
    setTransactionError("");
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newValue = value.replace(/,/g, '.');
    if (Number(newValue) <= 0) {
      setTransactionError('O valor a ser transferido deve ser maior que 0.');
    }
    if (Number(newValue) > 0) {
      await createTransaction(
        userData.token,
        userData.id,
        creditedUser,
        Number(newValue)
      )
        .then((res) => {
          loadTransactions();
          loadBalance();
          setCreditedUser("");
        })
        .catch(err => {
          console.log(err);
          if (err.response.data.message === 'Cannot send funds to yourself.') {
            setTransactionError('Você não pode enviar transações para si mesmo.');
          } else if (err.response.status === 404) {
            setTransactionError('Nome de usuário não encontrado.');
          }
          if (!creditedUser) {
            setTransactionError('Insira um nome de usuário.');
          }
        })
    }
  }

  return (
    <>
      <Container>
        <header>Nova Transferência</header>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <InputGroup>
              <label htmlFor="name">Transferir para:</label>
              <input
                id="userCredit"
                type="text"
                value={creditedUser}
                autoComplete="off"
                placeholder="nome de usuário"
                onChange={handleChangeCreditedUser}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="description">Valor:</label>
              <CurrencyInput
                id="value"
                name="value"
                prefix="R$"
                placeholder="quantia a ser transferida"
                value={value}
                disableGroupSeparators={true}
                decimalsLimit={2}
                onValueChange={(value) => setValue(value)}
              />
              {transactionError ? <br /> : ""}
              {transactionError ? <span>{transactionError}</span> : ""}
            </InputGroup>
          </InputContainer>
          <ButtonArea>
            <button type="submit">Transferir</button>
          </ButtonArea>
        </Form>
      </Container>
    </>
  )
}

export default TransactionsCreate;

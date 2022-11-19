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

  const handleChangeCreditedUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditedUser(event.target.value);
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

    try {
      await createTransaction(userData.token, userData.id, creditedUser, Number(value))
    } catch (error) {
      console.log(error);
    }
    loadTransactions();
    loadBalance();
    setCreditedUser("");
    setValue("");
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
                required={true}
                onChange={handleChangeCreditedUser}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="description">Valor:</label>
              <CurrencyInput
                id="value"
                name="value"
                placeholder="insira um valor"
                prefix="R$"
                decimalSeparator="."
                disableGroupSeparators={true}
                decimalsLimit={2}
                fixedDecimalLength={2}
                value={value}
                required={true}
                transformRawValue={(value) => String(value)}
                onValueChange={(value) => setValue(value)}
              />
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

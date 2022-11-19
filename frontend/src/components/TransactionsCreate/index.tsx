import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { createTransaction } from '../../services/api';
import { Container } from '../../styles/ContainerStyle';
import { ButtonArea, Form, InputContainer, InputGroup } from './styles';

const TransactionsCreate: React.FC = () => {
  const [userData] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [creditedUser, setCreditedUser] = useState<string>("");
  const [value, setValue] = useState<any>("");

  const handleChangeCreditedUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditedUser(event.target.value);
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createTransaction(userData.token, 5, creditedUser, Number(value))
    } catch (error) {
      console.log(error);
    }
    setCreditedUser("");
    setValue(0);
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
                placeholder="nome de usuário"
                onChange={handleChangeCreditedUser}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="description">Valor:</label>
              <input
                id="value"
                type="number"
                value={value}
                onChange={handleChangeValue}
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

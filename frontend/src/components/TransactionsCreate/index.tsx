import React from 'react'
import { Container } from '../../styles/ContainerStyle';
import { ButtonArea, Form, InputContainer, InputGroup } from './styles';

const TransactionsCreate: React.FC = () => {

  return (
    <>
      <Container>
        <header>Nova Transferência</header>
        <Form>
          <InputContainer>
            <InputGroup>
              <label htmlFor="name">Usuário a receber:</label>
              <input
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="description">Valor:</label>
              <input
                type="number"
              />
            </InputGroup>
          </InputContainer>
          <ButtonArea>
            <button type="submit">Cadastrar</button>
          </ButtonArea>
        </Form>
      </Container>
    </>
  )
}

export default TransactionsCreate;

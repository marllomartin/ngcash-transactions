import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../services/api';
import { Container } from '../../styles/ContainerStyle';
import { ButtonArea, Form, InputContainer, InputGroup } from './styles';

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const history = useNavigate();

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleIsRegistering = () => {
    setUsername("");
    setPassword("");
    setIsRegistering(!isRegistering);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegistering) {
      await register(username, password)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          history('/transactions');
        });
    }
    if (!isRegistering) {
      await login(username, password)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          history('/transactions');
        });
    }
    setUsername("");
    setPassword("");
  }

  return (
    <>
      <Container>
        <header>{isRegistering ? "Novo Cadastro" : "Fazer Login"}</header>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <InputGroup>
              <label>Nome de usuário:</label>
              <input
                id="username"
                value={username}
                type="text"
                autoComplete="off"
                required={true}
                placeholder="boca09"
                onChange={handleChangeUserName}
              />
            </InputGroup>
            <InputGroup>
              <label>Senha:</label>
              <input
                id="password"
                value={password}
                type="password"
                required={true}
                placeholder="sua senha"
                onChange={handleChangePassword}
              />
            </InputGroup>
          </InputContainer>
          <ButtonArea>
            <button
              type="submit"
            >
              {isRegistering ? "Cadastrar" : "Entrar"}
            </button>
          </ButtonArea>
          <ButtonArea>
            <button
              type="button"
              onClick={() => handleIsRegistering()}
            >
              {isRegistering ? "Fazer Login" : "Novo Cadastro"}
            </button>
          </ButtonArea>
        </Form>
      </Container>
    </>
  )
}

export default UserLogin;

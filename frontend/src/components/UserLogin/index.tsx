import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';
import { login, register } from '../../services/api';
import { Container } from '../../styles/ContainerStyle';
import SvgEyeOpen from '../../styles/svg/eye-open';
import { ButtonArea, Form, InputContainer, InputGroup } from './styles';

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [registerError, setRegisterError] = useState<string>("");

  const { setIsAuthenticated } = useContext(SessionContext);

  const history = useNavigate();

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleIsRegistering = () => {
    setUsername("");
    setPassword("");
    setPasswordShown(false);
    setIsRegistering(!isRegistering);
    if (!isRegistering) {
      setUsernameError('Nome de usuário deve ser único e ter no mínimo 3 caracteres.');
      setPasswordError('Senha deve conter uma letra maiúscula e ter no mínimo 8 caracteres.');
    }
    if (isRegistering) {
      setUsernameError('');
      setPasswordError('');
      setRegisterError('');
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegistering) {
      await register(username, password)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          setIsAuthenticated(true);
          history('/transactions');
        })
        .catch(err => {
          if (err.response.data.message === 'Password needs at least one uppercase letter') {
            setPasswordError('Senha deve conter uma letra maiúscula.');
          } else if (err.response.data.message === 'Password must be at least eight characters long') {
            setPasswordError('Senha deve ter no mínimo 8 caracteres.');
          } else if (err.response.status === 400) {
            setRegisterError('Todos os campos devem ser preenchidos.');
          }
          if (err.response.status === 409) {
            setRegisterError('Nome de usuário já registrado.');
          }
        });
    }
    if (!isRegistering) {
      await login(username, password)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          setIsAuthenticated(true);
          history('/transactions');
        })
        .catch(err => {
          if (
            (password.length > 0 && password.length < 8) ||
            (username.length > 0 && username.length < 3)
          ) {
            setPasswordError('Usuário ou senha incorreto.');
          } else if (err.response.status === 401 ||
            err.response.data.message === 'Password needs at least one uppercase letter') {
            setPasswordError('Usuário ou senha incorreto.');
          } else if (err.response.status === 400) {
            setPasswordError('Todos os campos devem ser preenchidos.');
          }
        }
        );
    }
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
                placeholder={isRegistering ? "novo usuário" : "seu usuário"}
                onChange={handleChangeUserName}
              />
              <span>{usernameError}</span>
            </InputGroup>
            <InputGroup>
              <label>Senha:</label>
              <input
                id="password"
                value={password}
                type={passwordShown ? "text" : "password"}
                placeholder={isRegistering ? "nova senha" : "sua senha"}
                onChange={handleChangePassword}
              />
              <SvgEyeOpen onClick={togglePassword}></SvgEyeOpen>
              <span>{passwordError}</span>
              {registerError ? <br /> : ""}
              {registerError ? <span>{registerError}</span> : ""}
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
            <p
              onClick={() => handleIsRegistering()}
            >
              {isRegistering ? "fazer login" : "novo cadastro"}
            </p>
          </ButtonArea>
        </Form>
      </Container>
    </>
  )
}

export default UserLogin;

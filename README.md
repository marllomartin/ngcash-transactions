# ng.cash transactions

## Sumário
- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Rodando o projeto](#rodando-o-projeto-com-o-docker)
- [Documentação da API](#documentação-da-api)

## Funcionalidades
Nessa aplicação, o usuário é capaz de:

  * Se cadastrar na plataforma;
  
    * Ao se cadastrar na plataforma, o usuário terá um saldo inicial de 100,00;

  * Fazer o login na aplicação, caso já esteja cadastrado;
  
    * É feita a autenticação do usuário ao logar na aplicação;
    
    * É fornecido um token JWT com a validade de 24 horas após o usuário logar ou se cadastrar na aplicação;
    
    * As credenciais sensíveis de cada usuário são *hashadas* ao serem salvas no banco;
  
  * Visualizar saldo;
  
  * Realizar transações para outros usuários cadastrados;
  
  * Receber transações de outros usuários cadastrados;

## Tecnologias Utilizadas

### Back-End
* [TypeScript](https://www.typescriptlang.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize ORM](https://sequelize.org/)
* [Node.js](https://nodejs.org/en/)
  * [Express](https://expressjs.com/pt-br/)
  * [JWT](https://jwt.io/introduction)
  * [MD5 Hash](https://www.npmjs.com/package/md5)
  * [CORS](https://www.npmjs.com/package/cors)
  * [HTTP-Status-Codes](https://www.npmjs.com/package/http-status-codes)

### Front-End
* [React](https://reactjs.org/)
  * [React Icons](https://react-icons.github.io/react-icons/)
  * [Styled Components](https://styled-components.com/)
  * [Axios](https://axios-http.com/ptbr/docs/intro)

## Rodando o projeto com o Docker

### Clonando o projeto:
```
git clone git@github.com:marllomartin/ngcash-transactions.git

cd ngcash-transactions
```
### Inicializando o Docker
Na pasta raíz do projeto:
```
docker-compose up --build
```

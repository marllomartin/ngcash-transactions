# ng.cash transactions

## Sumário
- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Rodando o projeto](#rodando-o-projeto-com-o-docker)
- [Documentação da API](#documentação-da-api)
- [Testes](#rodando-os-testes)

## Sobre

## Funcionalidades
Nessa aplicação, o usuário é capaz de:

  * Se cadastrar na plataforma;
  
    * Ao se cadastrar na plataforma, o usuário terá um saldo inicial de 100,00;

  * Fazer o login na aplicação, caso já esteja cadastrado;
  
    * É feita a autenticação do usuário ao logar na aplicação;
    
    * É fornecido um token JWT com a validade de 24 horas após o usuário logar ou se cadastrar na aplicação;
    
    * As credenciais sensíveis de cada usuário são *hashadas* ao serem salvas no banco;
  
  * Visualizar saldo;
  
    * Um usuário só poderá visualizar o saldo de sua própria conta;
  
  * Realizar transações para outros usuários cadastrados;
   
    * Um usuário só pode realizar transações pela sua própria conta;
    
    * Um usuário só poderá realizar transações caso tenha saldo o suficiente;
  
  * Receber transações de outros usuários cadastrados;
   
    * Um usuário só pode receber transações de outros usuários;
  
  * Visualizar transações em que participou;

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

## Documentação da API

### Cadastro

Tipo de Requisição: **POST**

PATH: **http://localhost:3001/register**

Exemplo de Body:
```
{
  "username": "newuser",
  "password": "Secret12345"
}
```
| Parâmetro | Descrição | Tipo |
|:----------|:-------------------|:-------|
| `username` |  O nome de usuário a ser cadastrado, deve ter pelo menos 3 caracteres. | String |
| `password` |  A senha do usuário a ser cadastrado, deve ter pelo menos 8 caracteres, um número e uma letra maiúscula. | String |

<details><summary>Exemplo de retorno</summary>

<br>

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoibmV3dXNlciIsImlhdCI6MTY2ODc4ODcyMCwiZXhwIjoxNjY4ODc1MTIwfQ.8JPO-5tIqvQJAPUaoQspRt65ZnLqLxXBless1TNbDCk"
}
```
</details>

### Login

Tipo de Requisição: **POST**

PATH: **http://localhost:3001/login**

Exemplo de Body:
```
{
  "username": "user",
  "password": "Secret54321"
}
```
| Parâmetro | Descrição | Tipo |
|:----------|:-------------------|:-------|
| `username` |  O nome de usuário que irá fazer o login. | String |
| `password` |  A senha do usuário que irá fazer o login. | String |

<details><summary>Exemplo de retorno</summary>

<br>

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoibmV3dXNlciIsImlhdCI6MTY2ODc4ODcyMCwiZXhwIjoxNjY4ODc1MTIwfQ.8JPO-5tIqvQJAPUaoQspRt65ZnLqLxXBless1TNbDCk"
}
```
</details>

### Realizar Transações

Essa requisição necessita que o usuário esteja autenticado, enviando um token válido em um header 'authorization'.

Tipo de Requisição: **POST**

PATH: **http://localhost:3001/transaction**

Exemplo de Body:
```
{
  "debitedAccountId": "1",
  "creditedAccountId": "2",
  "value": 45.50
}
```
| Parâmetro | Descrição | Tipo |
|:----------|:-------------------|:-------|
| `debitedAccountId` |  O id da conta do usuário que terá seu saldo debitado, deve pertencer a conta do usuário autenticado que está realizando a transação. | Number |## Sobre
| `creditedAccountId` |  O id da conta do usuário que receberá a transação e terá seu saldo creditado, deve ser diferente do 'debitedAccountId'. | Number |
| `value` | O valor da transação. | Number |

<details><summary>Exemplo de retorno</summary>

<br>

```
{
  "balance": "100.00"
}
```

</details>

### Checagem de Saldo da Conta

Essa requisição necessita que o usuário esteja autenticado, enviando um token válido em um header 'authorization'.

Tipo de Requisição: **GET**

PATH: **http://localhost:3001/balance/{accountId}**

<details><summary>Exemplo de retorno</summary>

<br>

```
{
  "balance": "100.00"
}
```

</details>

### Visualizar Transações de Usuário

Essa requisição necessita que o usuário esteja autenticado, enviando um token válido em um header 'authorization'.

Tipo de Requisição: **GET**

PATH: **http://localhost:3001/user/transactions**

<details><summary>Exemplo de retorno</summary>

<br>

```
[
  {
    "id": 1,
    "debitedAccountId": 1,
    "creditedAccountId": 2,
    "value": "10.50",
    "createdAt": "2022-11-18T16:10:25.766Z"
  },
  {
    "id": 2,
    "debitedAccountId": 2,
    "creditedAccountId": 1,
    "value": "30.55",
    "createdAt": "2022-11-18T16:10:45.036Z"
  }
]
```
</details>

# ng.cash transactions

<p align="center" width="100%">
    <img width="90%" src="https://github.com/marllomartin/ngcash-transactions/blob/master/frontend/public/images/DESKTOP.png">
</p>

## Sumário
- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Rodando o projeto](#rodando-o-projeto-com-o-docker)
- [Documentação da API](#documentação-da-api)
- [Testes de Integração](#testes-de-integração)
- [Diagrama do Banco de Dados](#diagrama-do-banco-de-dados)

## Sobre
Projeto de uma aplicação web fullstack que permite que usuários cadastrados realizem transferências monetárias internas entre si. Feito para um challenge acadêmico proposto pelo banco [NG.CASH](https://www.ng.cash/).

O backend da aplicação foi desenvolvido utilizando técnicas de TDD (Test Driven Development), no frontend foram aplicados os conceitos de web design mobile-first.

## Funcionalidades
Nessa aplicação, o usuário é capaz de:

  * Se cadastrar na plataforma;
  
    * Ao se cadastrar na plataforma, o usuário terá um saldo inicial de 100,00;

  * Fazer o login na aplicação, caso já esteja cadastrado;
  
    * É feita a autenticação do usuário ao logar na aplicação;
    
    * É fornecido um token JWT com a validade de 24 horas após o usuário logar ou se cadastrar na aplicação;
    
    * As credenciais sensíveis de cada usuário são *hashadas* ao serem salvas no banco;
  
  * Visualizar saldo;
  
  * Realizar transferências para outros usuários cadastrados;
  
  * Receber transferências de outros usuários cadastrados;
  
  * Visualizar as transferências em que participou;
  
  * Filtrar a visualização das transferências por transferências realizadas ou recebidas;
  
<p align="center" width="100%">
    <img width="70%" src="https://github.com/marllomartin/ngcash-transactions/blob/master/frontend/public/images/MOBILE.png">
</p>

## Tecnologias Utilizadas
* [Docker](https://www.docker.com/)
* [TypeScript](https://www.typescriptlang.org/)
#### Back-End
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize ORM](https://sequelize.org/)
* [Node.js](https://nodejs.org/en/)
  * [Express](https://expressjs.com/pt-br/)
  * [JWT](https://jwt.io/introduction)
  * [MD5 Hash](https://www.npmjs.com/package/md5)
  * [CORS](https://www.npmjs.com/package/cors)
  * [HTTP-Status-Codes](https://www.npmjs.com/package/http-status-codes)
  * [Chai](https://www.chaijs.com/)

#### Front-End
* [React](https://reactjs.org/)
  * [Styled Components](https://styled-components.com/)
  * [Axios](https://axios-http.com/ptbr/docs/intro)

## Rodando o projeto com o Docker

### Clonando o projeto:
```
git clone git@github.com:marllomartin/ngcash-transactions.git

cd ngcash-transactions
```
### Inicializando o Docker:

O banco de dados rodará na porta **5432**, o backend rodará na porta **3001** e o frontend rodará na porta **3000**.

Certifique-se que nenhuma das portas utilizadas pelos contêiners do Docker esteja indisponível.

#### Na pasta raíz do projeto:

```
docker-compose up --build
```
Aguarde a ativação dos três contêineres (database, backend, frontend), após isso, a aplicação estará pronta para ser acessada.

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
| Nome | Descrição | Tipo |
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
| Nome | Descrição | Tipo |
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
  "creditedAccountUsername": "fulaninho",
  "value": 45.50
}
```
| Nome | Descrição | Tipo |
|:----------|:-------------------|:-------|
| `debitedAccountId` |  O id da conta do usuário que realizará a transferência e terá seu saldo debitado, deve pertencer a conta do usuário autenticado que está realizando a transação. | Number |
| `creditedAccountUsername` |  O nome do usuário que receberá a transferência e terá seu saldo creditado, deve ser diferente do usuário que está realizando a transação. | String |
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

| Parâmetro | Descrição |
|:----------|:-------------------|
| `accountId` |  O id da conta do usuário a ter o saldo visualizado. |

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
    "debitedAccountUsername": "fulano",
    "creditedAccountUsername": "ciclano",
    "value": "10.50",
    "createdAt": "2022-11-18T16:10:25.766Z"
  },
  {
    "id": 2,
    "debitedAccountId": "fulano",
    "creditedAccountId": "beltrano",
    "value": "30.55",
    "createdAt": "2022-11-18T16:10:45.036Z"
  },
    {
    "id": 3,
    "debitedAccountId": "beltrano",
    "creditedAccountId": "fulano",
    "value": "10.00",
    "createdAt": "2022-11-18T16:10:45.036Z"
  }
]
```
</details>

## Testes de Integração

<p align="center" width="100%">
    <img width="80%" src="https://github.com/marllomartin/ngcash-transactions/blob/master/frontend/public/images/TEST.png">
</p>

Para rodar os testes da API é necessário que o serviço do PostgreSQL esteja instalado na sua máquina e as variáveis de ambiente do backend estejam configuradas corretamente, renomeie o arquivo `.env.example` localizado na raiz do backend para apenas `.env` e altere os valores indicados de acordo com suas próprias configurações.

Estrutura do `.env`:

`PG_USER`: Nome de usuário do Postgres.

`PG_PASSWORD`: Senha do Postgres.

`PG_DATABASE`: Nome do banco de dados Postgres, nesta aplicação chama-se "ngcash-transactions".

`PG_PORT`: Porta utilizada pelo Postgres, a porta padrão é a 5432.

`HOSTNAME`: Host do servidor, o host padrão é o localhost.

`PORT`: Porta utilizada pelo servidor, a porta padrão é a 3001.

`JWT_SECRET`: Segredo utilizado na criptografia do JWT.

### Instalando as dependências:
Na raíz do backend:
```
npm install
```
### Rodando o servidor do backend:
```
npm start
```

### Rodando os testes:

Antes de executar os testes, certifique-se que o serviço do PostgreSQL está ativo digitando ```service postgresql status``` em seu terminal.
```
npm run test
```

## Diagrama do Banco de Dados

<p align="center" width="100%">
    <img width="80%" src="https://github.com/marllomartin/ngcash-transactions/blob/master/frontend/public/images/DIAGRAM.png">
</p>


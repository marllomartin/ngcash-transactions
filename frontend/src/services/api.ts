import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const login = async (username: string, password: string) => {
  return api.post("login", { username, password });
};

export const register = async (username: string, password: string) => {
  return api.post("register", { username, password });
};

export const getTransactions = async (token: string) => {
  return api.get(
    "user/transactions", {
    headers: {
      "authorization": token
    }
  });
};

export const createTransaction = async (token: string, debitedAccountId: number, creditedAccountUsername: string, value: number) => {
  return api.post(
    "transaction",
    {
      debitedAccountId,
      creditedAccountUsername,
      value
    }, {
    headers: {
      "authorization": token
    }
  });
};

export const getAccountBalance = async (token: string, accountId: number) => {
  return api.get(
    `balance/${accountId}`, {
    headers: {
      "authorization": token
    }
  });
}

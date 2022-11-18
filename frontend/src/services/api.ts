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

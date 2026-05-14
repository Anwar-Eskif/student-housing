import axios from 'axios';
// type
import { User } from '../types/types';

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const register = async (user:User) : Promise<any> => {
  const response = await api.post<User>('/auth/register', user);
  return response.data;
};

export const login = async (user: { email:string , password:string}) : Promise<any> => {
  const response = await api.post<{ email:string , password:string}>('/auth/login', user);
  return response.data;
};

export const getUserDetails = async () : Promise<any> => {
  const response = await api.get('/auth/user')
  return response.data;
}
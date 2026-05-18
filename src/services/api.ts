import axios from 'axios';
import { stringify } from 'qs';
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

export const getlandLordOffers = async () : Promise<any> => {
  const response = await api.get('/offers/landlord/my-offers')
  return response.data;
}

export const getOffers = async (filters: any): Promise<any> => {
  const response = await api.get('/offers', {
    params: filters,
    paramsSerializer: params => {
      return stringify(params, { arrayFormat: 'repeat' })
    }
  });
  return response.data;
};

export const addNewOffer = async (offerData: FormData) : Promise<any> => {
  const response = await api.post('/offers/create', offerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
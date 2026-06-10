import axios from 'axios';
import { stringify } from 'qs';
// type
import { Offer, User } from '../types/types';

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

export const getOffers = async (filters: any): Promise<any> => {
  const response = await api.get('/offers', {
    params: filters,
    paramsSerializer: params => {
      return stringify(params, { arrayFormat: 'repeat' })
    }
  });
  return response.data;
};

export const getLatestOffers = async (): Promise<any> => {
  const response = await api.get('/offers/latest');
  return response.data;
};


// CONTROLLPANEL  
export const getlandLordOffers = async () : Promise<any> => {
  const response = await api.get('/offers/landlord/my-offers')
  return response.data;
}

export const addNewOffer = async (offerData: FormData) : Promise<any> => {
  const response = await api.post('/offers/create', offerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export const deleteOffer = async (offerId: number) : Promise<any> => {
  const response = await api.delete(`/offers/delete/${offerId}`);
  return response.data;
}

export const getOfferDetails = async (offerId: number) : Promise<{offer: Offer}> => {
  const response = await api.get(`/offers/${offerId}`);
  return response.data;
}

export const updateOffer = async (offerId: number, offerData: FormData) : Promise<any> => {
  const response = await api.put(`/offers/update/${offerId}`, offerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

// BOOKING
export const createBooking = async (bookingData: {
  offer_id: number,
  visit_date: string,
  visit_time: string
}): Promise<any> => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getMyBookings = async () : Promise<any> => {
  const response = await api.get(`/bookings/my`);
  return response.data;
}
import type { HttpResponse } from '@/types/common';
import { FormDataAccount, IUser } from '@/types/user';
import HttpClient from '@/utils/HttpClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/users`;

export const getCurrentUser = () => {
  return HttpClient.get<HttpResponse<IUser>>(`${prefix}/me`);
};

export const createAccount = async(payload: FormDataAccount) => {
  return HttpClient.post(`${prefix}/user-account-created`, payload)
}

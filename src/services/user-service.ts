import type { HttpResponse } from '@/types/common';
import { FormDataAccount, IUser } from '@/types/user';
import HttpClient from '@/utils/HttpClient';
import { GetParams, PaginatedResponse } from './base-service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/users`;

export const getCurrentUser = () => {
  return HttpClient.get<HttpResponse<IUser>>(`${prefix}/me`);
};

export const createAccount = async(payload: FormDataAccount) => {
  return HttpClient.post(`${prefix}/user-account-created`, payload)
}

// Lấy danh sách tài khoản
export const getAccounts = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IUser>>> => {
    const url = `${prefix}/user-accounts-list`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit
    }
    if(getParams.searchTerm && getParams.searchTerm.trim()){
        params.searchTerm = getParams.searchTerm
    }
    const response = await HttpClient.get<{
        success: boolean,
        message: string,
        data: PaginatedResponse<IUser>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response
    }else{
        throw new Error(response.message || 'Failed to fetch list accounts')
    }
}

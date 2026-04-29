import type { HttpResponse } from '@/types/common';
import { FormDataAccount, IUser, PayloadPassword, PayloadRole, PayloadUser } from '@/types/user';
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

// Lấy danh sách tài khoản
export const getListAccounts = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IUser>>> => {
    const url = `${prefix}/user-accounts`;
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


export const getDetailAccount = async(id:string) => {
    return HttpClient.get<HttpResponse<IUser>>(`${prefix}/user-account-detail/${id}`)
}

// chỉnh sửa hồ sơ
export const updateProfile = async(id: string, payload: PayloadUser) => {
    return HttpClient.put<HttpResponse<IUser>>(`${prefix}/profile-user-updated/${id}`, payload as any)
}

// vô hiệu hóa tài khoản
export const disableAccount = async(id: string) => {
    return HttpClient.patch<HttpResponse>(`${prefix}/user-account-disabled/${id}`)
}

// kich hoạt tài khoản
export const activateAccount = async(id: string) => {
    return HttpClient.patch<HttpResponse>(`${prefix}/user-account-activated/${id}`)
}

// Đổi mật khẩu
export const changePasswordAccount = async(id: string, payload: PayloadPassword) => {
    return HttpClient.put<HttpResponse>(`${prefix}/account-password-changed/${id}`, payload as any)
}

// thay đổi vai trò
export const changeRoleAccount = async(id: string, payload: PayloadRole) => {
    return HttpClient.patch<HttpResponse>(`${prefix}/account-role-changed/${id}`, payload as any)
}

// reset mật khẩu
export const resetAccount = async(id: string) => {
    return HttpClient.patch<HttpResponse<{name: string, account: string, password: string}>>(`${prefix}/user-password-reset/${id}`)
}
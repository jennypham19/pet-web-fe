import type { HttpResponse } from '@/types/common';
import { IPet, PayloadPet } from '@/types/pet';
import HttpClient from '@/utils/HttpClient';
import { GetParams, PaginatedResponse } from './base-service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/pets`;

export const createPet = async(payload: PayloadPet) => {
  return HttpClient.post(`${prefix}/pet-profile-created`, payload)
}

// Lấy danh sách
export const getPets = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IPet>>> => {
    const url = `${prefix}/pets-list`;
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
        data: PaginatedResponse<IPet>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response
    }else{
        throw new Error(response.message || 'Failed to fetch list pets')
    }
}
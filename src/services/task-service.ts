import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';
import { GetParams, PaginatedResponse } from './base-service';
import { ITask, PayloadTask } from '@/types/task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/tasks`;

export const createTask = async(payload: PayloadTask) => {
  return HttpClient.post(`${prefix}/task-created`, payload)
}

// Lấy danh sách
export const getTasks = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<ITask>>> => {
    const url = `${prefix}/list-tasks`;
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
        data: PaginatedResponse<ITask>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response
    }else{
        throw new Error(response.message || 'Failed to fetch list tasks')
    }
}

// cập nhập trạng thái
export const updateStatus = (id: string, payload: { status: string }) => {
    return HttpClient.patch(`${prefix}/status-updated/${id}`, payload)
}

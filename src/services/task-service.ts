import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';
import { GetParams, PaginatedResponse } from './base-service';
import { ITask, PayloadTask, PayloadTaskImages } from '@/types/task';
import { Dayjs } from 'dayjs';

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

// Lấy danh sách cho chuyên viên
export const getTasksForSpecialist = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<ITask>>> => {
    const url = `${prefix}/list-tasks-for-specialist`;
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
export const updateStatus = (id: string, payload: { status: string, finishedDate?: Dayjs | null, type: string }) => {
    return HttpClient.patch(`${prefix}/status-updated/${id}`, payload)
}

// cập nhật hình ảnh cho công việc
export const updateImagesForTask = (id: string, payload: PayloadTaskImages) => {
    return HttpClient.put(`${prefix}/images-task-uploaded/${id}`, payload)
}

// lấy chi tiết công việc
export const getDetailTask = (id: string) => {
    return HttpClient.get<HttpResponse<ITask>>(`${prefix}/detail-task/${id}`)
}


// xóa công việc
export const deleteTask = (id: string) => {
    return HttpClient.delete(`${prefix}/task-deleted/${id}`)
}
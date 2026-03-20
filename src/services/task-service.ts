import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';
import { PaginatedResponse } from './base-service';
import { PayloadTask } from '@/types/task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/tasks`;

export const createTask = async(payload: PayloadTask) => {
  return HttpClient.post(`${prefix}/task-created`, payload)
}
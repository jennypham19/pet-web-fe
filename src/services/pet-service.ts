import type { HttpResponse } from '@/types/common';
import { IImagesPet, IPet, IPetDeworming, IPetRegularVetCheckup, IPetVaccination, PayloadDataDeworming, PayloadDataRegularVetCheckup, PayloadDataVaccination, PayloadPet } from '@/types/pet';
import HttpClient from '@/utils/HttpClient';
import { PaginatedResponse } from './base-service';

export interface GetParams {
    page: number,
    limit: number,
    searchTerm?: string,
}

export interface GetParamsPet {
    id: string
    page: number,
    limit: number,
    searchTerm?: string,
}

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

// Lấy chi tiết hồ sơ thú cưng
export const getPet = async(id: string) => {
    return HttpClient.get<HttpResponse<IPet>>(`${prefix}/detail-pet/${id}`)
}

// Lấy hình ảnh thú cưng
export const getPetImages = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IImagesPet>>> => {
    const url = `${prefix}/list-pet-images`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit
    }
    const response = await HttpClient.get<{
        message: string,
        success: boolean,
        data: PaginatedResponse<IImagesPet>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response
    }else{
        throw new Error(response.message || 'Failed to fetch list images pet')
    }
}

// Thêm hình ảnh cho thú cưng
export const addPetImages = async(payloads: { imagePets: { petId: string,  nameImage: string, urlImage: string }[] }) => {
    return HttpClient.post(`${prefix}/pet-images-add`, payloads)
}


// Lấy danh sách lịch tiêm phòng
export const getPetVaccinations = async(getParams: GetParamsPet): Promise<HttpResponse<PaginatedResponse<IPetVaccination>>> => {
    const url = `${prefix}/vaccinations-pet`;
    const params: Record<string, any> = {
        id: getParams.id,
        page: getParams.page,
        limit: getParams.limit
    }
    const response = await HttpClient.get<{
        message: string,
        success: boolean,
        data: PaginatedResponse<IPetVaccination>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response
    }else {
        throw new Error(response.message || 'Failed to fetch list vaccinations pet')
    }
}

// Lấy danh sách lịch tẩy giun
export const getPetDewormings = async(getParams: GetParamsPet): Promise<HttpResponse<PaginatedResponse<IPetDeworming>>> => {
    const url = `${prefix}/dewormings-pet`;
    const params: Record<string, any> = {
        id: getParams.id,
        page: getParams.page,
        limit: getParams.limit
    }
    const response = await HttpClient.get<{
        message: string,
        success: boolean,
        data: PaginatedResponse<IPetDeworming>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response
    }else {
        throw new Error(response.message || 'Failed to fetch list dewormings pet')
    }
}

// Lấy danh sách khám định kỳ
export const getPetRegularVetCheckups = async(getParams: GetParamsPet): Promise<HttpResponse<PaginatedResponse<IPetRegularVetCheckup>>> => {
    const url = `${prefix}/regular-vet-checkups-pet`;
    const params: Record<string, any> = {
        id: getParams.id,
        page: getParams.page,
        limit: getParams.limit
    }
    const response = await HttpClient.get<{
        message: string,
        success: boolean,
        data: PaginatedResponse<IPetRegularVetCheckup>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response
    }else {
        throw new Error(response.message || 'Failed to fetch list regular vet checkups pet')
    }
}

// Thêm lịch tiêm phòng
export const addPetVaccination = async(payload: PayloadDataVaccination) => {
    return HttpClient.post(`${prefix}/pet-vaccination-add`, payload)
}

// Thêm lịch tiêm phòng
export const addPetDeworming = async(payload: PayloadDataDeworming) => {
    return HttpClient.post(`${prefix}/pet-deworming-add`, payload)
}

// Thêm khám định kỳ
export const addPetRegularVetCheckup = async(payload: PayloadDataRegularVetCheckup) => {
    return HttpClient.post(`${prefix}/pet-regular-vet-checkup-add`, payload)
}
    
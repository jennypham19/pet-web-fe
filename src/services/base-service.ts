export interface PaginatedResponse<T>{
    data: T[];
    totalPages: number;
    currentPage: number;
    total: number;
    limit?: number
}

export interface GetParams {
    page: number,
    limit: number,
    searchTerm?: string,
}
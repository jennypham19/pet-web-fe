import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';
import { NotificationListResponse } from '@/types/notification';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const prefix = `${API_BASE_URL}/api/notifications`;

// Lấy danh sách thông báo của người dùng hiện tại
export const getNotifications = (params?: { page?: number; limit?: number }) => {
    return HttpClient.get<HttpResponse<NotificationListResponse>>(`${prefix}/list-notifications`, { params });
};

// Lấy số thông báo chưa đọc (badge)
export const getUnreadCount = () => {
    return HttpClient.get<HttpResponse<{ unreadCount: number }>>(`${prefix}/unread-count`);
};

// Đánh dấu 1 thông báo đã đọc
export const markNotificationAsRead = (id: string) => {
    return HttpClient.patch<HttpResponse<{ unreadCount: number }>>(`${prefix}/read/${id}`);
};

// Đánh dấu tất cả đã đọc
export const markAllNotificationsAsRead = () => {
    return HttpClient.patch<HttpResponse<{ unreadCount: number }>>(`${prefix}/read-all`);
};

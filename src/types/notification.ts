// src/types/notification.ts

export interface INotification {
    id: string;
    type: string;
    title: string;
    message: string;
    reason: string | null;
    metadata: {
        imageName?: string;
        imageUrl?: string;
        taskName?: string;
        [key: string]: any;
    } | null;
    isRead: boolean;
    taskId: string | null;
    senderId: string | null;
    sender: {
        id: string;
        name: string;
        role: string;
    } | null;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationListResponse {
    data: INotification[];
    unreadCount: number;
    totalPages: number;
    currentPage: number;
    total: number;
}

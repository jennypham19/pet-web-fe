import { INotification } from '@/types/notification';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface NotificationState {
    items: INotification[];
    unreadCount: number;
}

const initialState: NotificationState = {
    items: [],
    unreadCount: 0,
};

const notificationSlice = createSlice({
    name: '@notification',
    initialState,
    reducers: {
        // Gán toàn bộ danh sách (khi fetch lần đầu / mở popover)
        setNotifications(state, action: PayloadAction<INotification[]>) {
            state.items = action.payload;
        },
        setUnreadCount(state, action: PayloadAction<number>) {
            state.unreadCount = action.payload;
        },
        // Thêm 1 thông báo mới nhận realtime (đẩy lên đầu)
        addNotification(state, action: PayloadAction<INotification>) {
            const exists = state.items.some((item) => item.id === action.payload.id);
            if (!exists) {
                state.items = [action.payload, ...state.items];
            }
        },
        // Đánh dấu 1 thông báo đã đọc
        markRead(state, action: PayloadAction<string>) {
            const target = state.items.find((item) => item.id === action.payload);
            if (target && !target.isRead) {
                target.isRead = true;
            }
        },
        // Đánh dấu tất cả đã đọc
        markAllRead(state) {
            state.items.forEach((item) => {
                item.isRead = true;
            });
            state.unreadCount = 0;
        },
        // Reset khi logout
        resetNotifications(state) {
            state.items = [];
            state.unreadCount = 0;
        },
    },
});

export const {
    setNotifications,
    setUnreadCount,
    addNotification,
    markRead,
    markAllRead,
    resetNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;

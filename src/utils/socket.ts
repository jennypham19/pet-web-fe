// src/utils/socket.ts
import { io, Socket } from 'socket.io-client';
import { getAccessToken } from './AuthHelper';

// URL của backend (Socket.IO gắn chung với HTTP server)
const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

let socket: Socket | null = null;

// Khởi tạo (hoặc lấy lại) kết nối socket cho user hiện tại
export const connectSocket = (userId?: string): Socket => {
    if (socket && socket.connected) {
        return socket;
    }

    const token = getAccessToken();

    socket = io(SOCKET_URL, {
        auth: {
            token: token || undefined,
            userId: userId || undefined
        },
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: true
    });

    // Khi kết nối (hoặc kết nối lại) thì join lại room theo userId
    socket.on('connect', () => {
        if (userId) {
            socket?.emit('register', { userId });
        }
    });

    return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
    }
};

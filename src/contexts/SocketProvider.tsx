import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { FCC } from '@/types/react';
import { connectSocket, disconnectSocket } from '@/utils/socket';
import {
    addNotification,
    resetNotifications,
    setNotifications,
    setUnreadCount,
} from '@/slices/notification';
import { getNotifications } from '@/services/notification-service';
import { INotification } from '@/types/notification';
import useNotification from '@/hooks/useNotification';

const SocketProvider: FCC = ({ children }) => {
    const { profile, isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const notify = useNotification();

    const userId = profile?.id;

    useEffect(() => {
        if (!userId || !isAuthenticated) {
            return;
        }

        // 1. Lấy danh sách thông báo + số chưa đọc ban đầu
        const fetchInitial = async () => {
            try {
                const res: any = await getNotifications({ page: 1, limit: 20 });
                const data = res?.data;
                if (data) {
                    dispatch(setNotifications(data.data || []));
                    dispatch(setUnreadCount(data.unreadCount || 0));
                }
            } catch (error) {
                // im lặng nếu lỗi fetch thông báo
            }
        };
        fetchInitial();

        // 2. Kết nối socket và lắng nghe thông báo realtime
        const socket = connectSocket(userId);
        socket.emit('register', { userId });

        const handleNewNotification = (payload: {
            notification: INotification;
            unreadCount: number;
        }) => {
            if (payload?.notification) {
                dispatch(addNotification(payload.notification));
                dispatch(setUnreadCount(payload.unreadCount ?? 0));
                notify({
                    message: payload.notification.title || 'Bạn có thông báo mới',
                    severity: 'info',
                });
            }
        };

        socket.on('notification:new', handleNewNotification);

        return () => {
            socket.off('notification:new', handleNewNotification);
        };
    }, [userId, isAuthenticated, dispatch]);

    // Ngắt kết nối + reset khi đăng xuất
    useEffect(() => {
        if (!isAuthenticated) {
            disconnectSocket();
            dispatch(resetNotifications());
        }
    }, [isAuthenticated, dispatch]);

    return <>{children}</>;
};

export default SocketProvider;

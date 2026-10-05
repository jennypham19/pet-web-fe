import { useState, MouseEvent } from 'react';
import {
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItemButton,
    Popover,
    Stack,
    Typography,
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store';
import {
    markAllRead,
    markRead,
    setNotifications,
    setUnreadCount,
} from '@/slices/notification';
import {
    getNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from '@/services/notification-service';
import { INotification } from '@/types/notification';
import DateTime from '@/utils/DateTime';
import { COLORS } from '@/constants/colors';

const NotificationBell = () => {
    const dispatch = useAppDispatch();
    const { items, unreadCount } = useAppSelector((state) => state.notification);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const open = Boolean(anchorEl);

    const handleOpen = async (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        // Làm mới danh sách khi mở
        try {
            const res: any = await getNotifications({ page: 1, limit: 20 });
            const data = res?.data;
            if (data) {
                dispatch(setNotifications(data.data || []));
                dispatch(setUnreadCount(data.unreadCount || 0));
            }
        } catch (error) {
            // bỏ qua lỗi fetch
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickItem = async (notification: INotification) => {
        if (notification.isRead) return;
        dispatch(markRead(notification.id));
        dispatch(setUnreadCount(Math.max(0, unreadCount - 1)));
        try {
            await markNotificationAsRead(notification.id);
        } catch (error) {
            // bỏ qua lỗi
        }
    };

    const handleMarkAllRead = async () => {
        if (unreadCount === 0) return;
        dispatch(markAllRead());
        try {
            await markAllNotificationsAsRead();
        } catch (error) {
            // bỏ qua lỗi
        }
    };

    return (
        <>
            <IconButton onClick={handleOpen} sx={{ color: '#000' }}>
                <Badge badgeContent={unreadCount} color="error" max={99}>
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{ paper: { sx: { width: 380, maxWidth: '90vw' } } }}
            >
                <Box
                    sx={{
                        px: 2,
                        py: 1.5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography fontWeight={700}>
                        Thông báo{unreadCount > 0 ? ` (${unreadCount})` : ''}
                    </Typography>
                    <Button
                        size="small"
                        onClick={handleMarkAllRead}
                        disabled={unreadCount === 0}
                        sx={{ color: COLORS.PRIMARY, textTransform: 'none' }}
                    >
                        Đánh dấu tất cả đã đọc
                    </Button>
                </Box>
                <Divider />

                {items.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Bạn chưa có thông báo nào.
                        </Typography>
                    </Box>
                ) : (
                    <List sx={{ maxHeight: 420, overflowY: 'auto', p: 0 }}>
                        {items.map((item) => (
                            <ListItemButton
                                key={item.id}
                                onClick={() => handleClickItem(item)}
                                alignItems="flex-start"
                                sx={{
                                    bgcolor: item.isRead ? 'transparent' : 'rgba(50, 173, 230, 0.08)',
                                    borderBottom: '1px solid #f0f0f0',
                                    display: 'block',
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {!item.isRead && (
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: COLORS.PRIMARY,
                                                flexShrink: 0,
                                            }}
                                        />
                                    )}
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        {item.title}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    {item.message}
                                </Typography>
                                {item.reason && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 0.5,
                                            color: 'error.main',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        Lý do: {item.reason}
                                    </Typography>
                                )}
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ display: 'block', mt: 0.5 }}
                                >
                                    {DateTime.FormatDateHour(item.createdAt)}
                                    {item.sender?.name ? ` · ${item.sender.name}` : ''}
                                </Typography>
                            </ListItemButton>
                        ))}
                    </List>
                )}
            </Popover>
        </>
    );
};

export default NotificationBell;

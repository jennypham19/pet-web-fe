import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";
import { deleteTaskImage, getDetailTask } from "@/services/task-service";
import { ITask } from "@/types/task";
import DateTime from "@/utils/DateTime";
import { getFrequencyTaskLabel, getStatusTaskColor, getStatusTaskLabel, getTimeTaskLabel } from "@/utils/labelEntoVni";
import PetsAvatar from "@/views/components/PetsAvatar";
import { Box, Button, Chip, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import useNotification from "@/hooks/useNotification";
import { COLORS } from "@/constants/colors";

interface ViewTaskProps{
    open: boolean,
    onClose: (type: string) => void;
    id: string
}

const ViewTask = (props: ViewTaskProps) => {
    const { open, onClose, id} = props;
    const notify = useNotification();
    const [task, setTask] = useState<ITask | null>(null);
    // ảnh đang chờ xác nhận xóa
    const [imageToDelete, setImageToDelete] = useState<{ id: string, nameImage: string } | null>(null);
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getTask = async() => {
        const res = await getDetailTask(id);
        const data = res.data as any as ITask;
        setTask(data);
    }

    useEffect(() => {
        if(open && id) {
            getTask()
        }
    }, [open, id])

    const handleOpenDeleteImage = (image: { id: string, nameImage: string }) => {
        setImageToDelete(image);
        setReason('');
    }

    const handleCloseDeleteImage = () => {
        setImageToDelete(null);
        setReason('');
    }

    const handleConfirmDeleteImage = async () => {
        if (!imageToDelete || !reason.trim()) return;
        setIsSubmitting(true);
        try {
            const res: any = await deleteTaskImage(imageToDelete.id, reason.trim());
            notify({
                message: res?.message || 'Xóa ảnh thành công',
                severity: 'success'
            });
            handleCloseDeleteImage();
            // Làm mới chi tiết công việc (ảnh biến mất + trạng thái về chờ xử lý)
            await getTask();
        } catch (error: any) {
            notify({
                message: error?.message || 'Xóa ảnh thất bại',
                severity: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <DialogComponent
            dialogKey={open}
            handleClose={() => onClose('view')}
            dialogTitle="Xem chi tiết"
            isIcon={false}
            labelBtn='Đóng'
        >
            {task && (
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" color="text.secondary">Công việc</Typography>
                        <Typography variant="subtitle2" fontWeight={500}>{task.name}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" color="text.secondary">Thời gian bắt đầu</Typography>
                        <Typography variant="subtitle2" fontWeight={500}>{DateTime.FormatDateHour(task.hour)}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" color="text.secondary">Thời gian kết thúc</Typography>
                        <Typography variant="subtitle2" fontWeight={500}>{DateTime.FormatDateHour(task.finishedDate) || '00:00 AM/PM'}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <PetsAvatar pets={task.pets}/>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" color="text.secondary">Tần suất</Typography>
                        <Typography variant="subtitle2" fontWeight={500}>{getFrequencyTaskLabel(task.frequency)}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" color="text.secondary">Thời điểm</Typography>
                        <Typography variant="subtitle2" fontWeight={500}>{getTimeTaskLabel(task.time)}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" color="text.secondary">Nhân viên</Typography>

                        {task.images.length > 0 && (<Typography variant="subtitle2" fontWeight={500}>{task.images[0].uploadedBy}</Typography>)}
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="subtitle2" color="text.secondary">Trạng thái</Typography>
                        <Chip
                            label={getStatusTaskLabel(task.status)}
                            color={getStatusTaskColor(task.status).color}
                        />
                    </Grid>
                    {task.images.length > 0 && (
                        <Grid size={{ xs: 12 }}>
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="subtitle2" color="text.secondary">Hình ảnh cập nhật</Typography>
                                </Grid>
                                {task.images.map((img, index) => (
                                    <Grid key={img.id || index} size={{ xs: 12, md: 3 }}>
                                        <Box sx={{ position: 'relative', width: 100 }}>
                                            <CommonImage
                                                src={img.urlImage}
                                                alt={`${img.nameImage}_${index}`}
                                                sx={{ width: 100, height: 100, borderRadius: 2 }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => handleOpenDeleteImage({ id: img.id, nameImage: img.nameImage })}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 2,
                                                    right: 2,
                                                    bgcolor: 'rgba(255,255,255,0.85)',
                                                    '&:hover': { bgcolor: '#fff' }
                                                }}
                                            >
                                                <Delete fontSize="small" color="error" />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* Dialog nhập lý do xóa ảnh */}
            {imageToDelete && (
                <DialogComponent
                    dialogKey={!!imageToDelete}
                    handleClose={handleCloseDeleteImage}
                    dialogTitle="Xóa ảnh công việc"
                    isActiveFooter={false}
                    maxWidth="xs"
                    dialogContentHeight="fit-content"
                >
                    <Stack spacing={2} direction="column">
                        <Typography variant="body2">
                            Bạn chắc chắn muốn xóa ảnh <b>{imageToDelete.nameImage}</b>? Công việc sẽ được chuyển về
                            trạng thái chờ xử lý và người chụp sẽ nhận được thông báo kèm lý do.
                        </Typography>
                        <TextField
                            label="Lý do xóa ảnh"
                            placeholder="Nhập lý do xóa ảnh..."
                            multiline
                            minRows={3}
                            fullWidth
                            required
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            <Button variant="outlined" onClick={handleCloseDeleteImage} disabled={isSubmitting}>
                                Hủy
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleConfirmDeleteImage}
                                disabled={!reason.trim() || isSubmitting}
                                sx={{ bgcolor: COLORS.PAYMENT_STATUS.PENDING }}
                            >
                                Xóa ảnh
                            </Button>
                        </Stack>
                    </Stack>
                </DialogComponent>
            )}
        </DialogComponent>
    )
}

export default ViewTask;

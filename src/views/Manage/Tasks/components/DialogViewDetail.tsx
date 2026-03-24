import DialogComponent from "@/components/DialogComponent";
import { getDetailTask } from "@/services/task-service";
import { ITask } from "@/types/task";
import { getStatusTaskColor, getStatusTaskLabel } from "@/utils/labelEntoVni";
import PetsAvatar from "@/views/components/PetsAvatar";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2"
import DateTime from "@/utils/DateTime";
import CommonImage from "@/components/Image/index";
import { COLORS } from "@/constants/colors";

interface DialogViewDetailProps{
    open: boolean,
    onClose: () => void;
    id: string;
    onUploadAndUpdate: (id: string, type: string) => void;
}

const DialogViewDetail = (props: DialogViewDetailProps) => {
    const { open, onClose, id, onUploadAndUpdate } = props;
    const [task, setTask] = useState<ITask | null>(null);

    useEffect(() => {
        if(open && id){
            const getTask = async() => {
                const res = await getDetailTask(id);
                const data = res.data as any as ITask;
                setTask(data);
            };
            getTask()
        }
    }, [open, id])
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveFooter={false}
            dialogTitle="Chi tiết công việc"
        >
            {task && (
                <Box>
                    <PetsAvatar pets={task.pets} height={45} width={45}/>
                    <Typography color="text.secondary" my={1.5} variant="subtitle2">Công việc</Typography>
                    <Typography mb={1.5} variant="subtitle2" fontWeight={600}>{task.name}</Typography>
                    <Typography color="text.secondary" my={1.5} variant="subtitle2">Yêu cầu</Typography>
                    <Typography mb={1.5} variant="subtitle2" fontWeight={600}>{task.requiredNote}</Typography>
                    <Stack mb={2} direction='row' gap={3}>
                        <Typography color="text.secondary" variant="subtitle2">Trạng thái</Typography>
                        <Chip
                            label={getStatusTaskLabel(task.status)}
                            color={getStatusTaskColor(task.status).color}
                        />
                    </Stack>
                    {task.images.length > 0 && (
                        <Grid sx={{ mb: 2 }} container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" fontWeight={600}>Hình ảnh cập nhập</Typography>
                            </Grid>
                            {task.images.map((img, index) => (
                                <Grid key={index} size={{ xs: 3 }}>
                                    <CommonImage
                                        src={img.urlImage}
                                        alt={img.nameImage}
                                        borderRadius={2}
                                        sx={{
                                            width: 150, height: 100
                                        }}
                                    />
                                    <Stack></Stack>
                                    <Typography variant="caption" mt={2}>{DateTime.FormatDateHour(img.uploadedDate)}</Typography>
                                </Grid>
                            ))}                   
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6 }}>
                            <Typography color="text.secondary" mb={1} variant="subtitle2">Thời gian bắt đầu</Typography>
                            <Typography variant="subtitle2" fontWeight={600}>{DateTime.FormatDateHour(task.hour)}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Typography color="text.secondary" mb={1} variant="subtitle2">Thời gian kết thúc</Typography>
                            <Typography variant="subtitle2" fontWeight={600}>{DateTime.FormatDateHour(task.finishedDate) || '00:00 AM/PM'}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                
            )}
            {task && task.status === 'pending' && (
                <Stack mt={2} justifyContent='flex-end'>
                    <Button
                        onClick={() => { onUploadAndUpdate(task.id, 'start'); onClose() }}
                        sx={{ bgcolor: COLORS.PRIMARY, px: 3 }}
                    >
                        Bắt đầu
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{ color: COLORS.PRIMARY, border: `1px solid ${COLORS.PRIMARY}`, px: 3}}
                    >
                        Hủy
                    </Button>
                </Stack>
            )}
            {task && task.status === 'in_progress' && (
                <Stack mt={2} justifyContent='flex-end'>
                    <Button
                        onClick={() => { onUploadAndUpdate(task.id, 'completed'); onClose()}}
                        sx={{ bgcolor: COLORS.PRIMARY, px: 3 }}
                        disabled={!task.isUpdatedImage}
                    >
                        Hoàn thành
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{ color: COLORS.PRIMARY, border: `1px solid ${COLORS.PRIMARY}`, px: 3}}
                    >
                        Hủy
                    </Button>
                </Stack>
            )}
            {task && task.status === 'completed' && (
                <Stack mt={2} justifyContent='flex-end'>
                    <Button
                        onClick={onClose}
                        sx={{ bgcolor: COLORS.PRIMARY, px: 3 }}
                    >
                        Đóng
                    </Button>
                </Stack>
            )}
        </DialogComponent>
    )
}

export default DialogViewDetail;
import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";
import { getDetailTask } from "@/services/task-service";
import { ITask } from "@/types/task";
import DateTime from "@/utils/DateTime";
import { getStatusTaskColor, getStatusTaskLabel } from "@/utils/labelEntoVni";
import PetsAvatar from "@/views/components/PetsAvatar";
import { Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

interface ViewTaskProps{
    open: boolean,
    onClose: (type: string) => void;
    id: string
}

const ViewTask = (props: ViewTaskProps) => {
    const { open, onClose, id} = props;
    const [task, setTask] = useState<ITask | null>(null);
    useEffect(() => {
        if(open && id) {
            const getTask = async() => {
                const res = await getDetailTask(id);
                const data = res.data as any as ITask;
                setTask(data);
            }

            getTask()
        }
    }, [open, id])
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
                        <Typography variant="subtitle2" fontWeight={500}>{task.frequency}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" color="text.secondary">Thời điểm</Typography>
                        <Typography variant="subtitle2" fontWeight={500}>{task.time}</Typography>
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
                                    <Grid key={index} size={{ xs: 12, md: 3 }}>
                                        <CommonImage
                                            key={index}
                                            src={img.urlImage}
                                            alt={`${img.nameImage}_${index}`}
                                            sx={{ width: 100, height: 100, borderRadius: 2 }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}
        </DialogComponent>
    )
}

export default ViewTask;
import Backdrop from "@/components/Backdrop";
import DialogComponent from "@/components/DialogComponent";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { deleteTask, getDetailTask } from "@/services/task-service";
import { ITask } from "@/types/task";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface DeleteConfirmTaskProps{
    open: boolean,
    onClose: (type: string) => void;
    id: string
}

const DeleteConfirmTask = (props: DeleteConfirmTaskProps) => {
    const { open, onClose, id } = props;
    const notify = useNotification();
    const [task, setTask] = useState<ITask | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if(open && id){
            const getTask = async() => {
                const res = await getDetailTask(id);
                const data = res.data as any as ITask;
                setTask(data);
            }
            getTask()
        }
    }, [open, id])

    const handleClose = () => {
        onClose('delete');
    }

    const handleSave = async() => {
        setIsSubmitting(true);
        try {
            const res = await deleteTask(id);
            notify({ message: res.message, severity: 'success' });
            handleClose();
        } catch (error: any) {
            notify({ message: error.message, severity: 'error' })
        } finally {
            setIsSubmitting(false);
        }
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isIcon={false}
            maxWidth='xs'
            isCenter={false}
            customButtons={
                <Button
                    onClick={handleSave}
                    sx={{ bgcolor: COLORS.PRIMARY }}
                >
                    Đồng ý
                </Button>
            }
        >
            <Typography>Bạn có muốn xóa công việc <b>{task?.name}</b> này không?</Typography>
            {isSubmitting && <Backdrop open={isSubmitting}/>}
        </DialogComponent>
    )
}

export default DeleteConfirmTask;
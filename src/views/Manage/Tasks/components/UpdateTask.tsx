import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import { getDetailTask } from "@/services/task-service";
import { FormErrorsTask } from "@/types/errors";
import { IPet } from "@/types/pet";
import { FormDataTask, ITask } from "@/types/task";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AutocompleteComponent from "./AutocompleteComponent";
import { getPets } from "@/services/pet-service";
import InputSelect from "@/components/InputSelect";

interface UpdateTaskProps{
    open: boolean,
    onClose: (type: string) => void;
    id: string
}

const UpdateTask = (props: UpdateTaskProps) => {
    const { open, onClose, id } = props;
    const { profile } = useAuth();
    const notify = useNotification();
    const [otherFrequency, setOtherFrequency] = useState<string | null>(null);
    const [errorOtherFrequency, setErrorOtherFrequency] = useState<string | null>(null);
    const [frequency, setFrequency] = useState('');
    const [formDataTask, setFormDataTask] = useState<FormDataTask>({ name: '', pets: [], time: '', hour: null, frequency: '', requiredNote: '' })
    const [errorsTask, setErrorsTask] = useState<FormErrorsTask>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if(open && id){
            const getTask = async() => {
                const res = await getDetailTask(id);
                const data = res.data as any as ITask;
                const pets = data.pets as any as IPet[]
                setFormDataTask({
                    name: data.name,
                    pets: pets,
                    time: data.time,
                    hour: dayjs(data.hour),
                    frequency: data.frequency,
                    requiredNote: data.requiredNote
                })
                setOtherFrequency(data.otherFrequency);
                setFrequency(data.frequency)
            }

            getTask()
        }
    }, [open, id])

    const reset = () => {
      setFormDataTask({ name: '', pets: [], time: '', hour: null, frequency: '', requiredNote: '' })
      setErrorsTask({})
      setOtherFrequency(null)
      setFrequency('')
      setErrorOtherFrequency(null)
    }

    const handleClose = () => {
        onClose('update');
        reset()
    }

    const handleInputChange = (name: string, value: any) => {

    }
    
    const handleSave = async() => {

    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            dialogTitle="Chỉnh sửa công việc"
            isIcon={false}
            customButtons={
                <Button
                    onClick={handleSave}
                    sx={{ bgcolor: COLORS.PRIMARY }}
                >
                    Lưu
                </Button>
            }
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <InputText
                        label=""
                        name="name"
                        type="text"
                        value={formDataTask.name}
                        onChange={handleInputChange}
                        placeholder="Công việc *"
                        error={!!errorsTask.name}
                        helperText={errorsTask.name}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <AutocompleteComponent<IPet>
                        placeholder="Thú cưng *"
                        fetchOptions={getPets}
                        getOptionLabel={(option) => option.name}
                        getOptionKey={(option) => option.id}
                        onChange={(value) => {
                            setFormDataTask(prev => ({ ...prev, 'pets': value }))
                            setErrorsTask(prev => ({ ...prev, 'pets': undefined }))
                        }}
                        values={formDataTask.pets}
                        getRenderOption={(option) => (
                            <>
                                <img
                                    alt={option.nameAvatar}
                                    loading="lazy"
                                    width={20} height={20}
                                    src={option.urlAvatar}
                                />
                                <Typography variant="subtitle2">{option.name}</Typography>
                            </>
                        )}
                        error={!!errorsTask.pets}
                        helperText={errorsTask.pets}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <InputSelect
                        label=''
                        onChange={handleInputChange}
                        name='time'
                        value={formDataTask.time}
                        options={[
                            { id: 1, label: 'Buổi sáng', value: 'morning' },
                            { id: 2, label: 'Buổi trưa', value: 'noontime' },
                            { id: 3, label: 'Buổi chiều', value: 'afternoon' },
                            { id: 4, label: 'Buổi tối', value: 'evening' },
                        ]}
                        placeholder='Thời điểm'
                        error={!!errorsTask.time}
                        helperText={errorsTask.time}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <InputText
                        label=""
                        placeholder="Thời gian"
                        value={formDataTask.hour}
                        type="time"
                        onChange={handleInputChange}
                        name="hour"
                        error={!!errorsTask.hour}
                        helperText={errorsTask.hour}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <InputSelect
                        label=''
                        name='frequency'
                        value={formDataTask.frequency}
                        onChange={handleInputChange}
                        options={[
                            { id: 1, label: 'Hằng ngày', value: 'everyday' },
                            { id: 2, label: '1 lần/ngày', value: 'one_time_day' },
                            { id: 3, label: '2 lần/ngày', value: 'two_times_day' },
                            { id: 4, label: '3 lần/ngày', value: 'three_times_day' },
                            { id: 5, label: 'Hằng tuần', value: 'everyweek' },
                            { id: 6, label: '1 lần/tuần', value: 'one_time_week' },
                            { id: 7, label: '2 lần/tuần', value: 'two_times_week' },
                            { id: 8, label: '3 lần/tuần', value: 'three_times_week' },
                            { id: 9, label: 'Hằng tháng', value: 'everymonth' },
                            { id: 10, label: 'Khác', value: 'others' },
                        ]}
                        placeholder='Tần suất'
                        error={!!errorsTask.frequency}
                        helperText={errorsTask.frequency}
                    />
                </Grid>
                {frequency === 'others' && (
                    <Grid size={{ xs: 12 }}>
                    <InputText
                        label=""
                        name="otherFrequency"
                        type="text"
                        value={otherFrequency}
                        onChange={(name: string, value: any) => {
                            setOtherFrequency(value);
                            setErrorOtherFrequency(null)
                        }}
                        placeholder="Nhập tần suất khác"
                        error={!!errorOtherFrequency}
                        helperText={errorOtherFrequency}
                    />
                    </Grid>
                )}
                <Grid size={{ xs: 12 }}>
                    <InputText
                    label=""
                    name="requiredNote"
                    value={formDataTask.requiredNote}
                    onChange={handleInputChange}
                    type="text"
                    multiline
                    rows={3}
                    placeholder="Yêu cầu *"
                    error={!!errorsTask.requiredNote}
                    helperText={errorsTask.requiredNote}
                    />
                </Grid>
            </Grid>
        </DialogComponent>
    )
}

export default UpdateTask;
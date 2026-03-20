import { useEffect, useState } from "react";



import Grid from "@mui/material/Grid2";
import DialogComponent from "@/components/DialogComponent";
import InputMaskTextField from "@/components/InputMaskTextField";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";



import { getPets } from "@/services/pet-service";
import { IPet } from "@/types/pet";
import { Button, Typography } from "@mui/material";
import { COLORS } from "@/constants/colors";
import AutocompleteComponent from "./AutocompleteComponent";
import AutocompleteComponentPet from "./AutocomplePet";
import { FormDataTask, PayloadTask } from "@/types/task";
import dayjs from "dayjs";
import { FormErrorsTask } from "@/types/errors";
import useNotification from "@/hooks/useNotification";
import { createTask } from "@/services/task-service";
import Backdrop from "@/components/Backdrop";


interface CreateTaskProps{
    open: boolean,
    onClose: () => void;
}

const CreateTask = (props: CreateTaskProps) => {
    const { open, onClose } = props;
    const notify = useNotification();
    const [otherFrequency, setOtherFrequency] = useState('');
    const [errorOtherFrequency, setErrorOtherFrequency] = useState<string | null>(null);
    const [frequency, setFrequency] = useState('');
    const [formDataTask, setFormDataTask] = useState<FormDataTask>({ name: '', pets: [], time: '', hour: null, frequency: '', requiredNote: '' })
    const [errorsTask, setErrorsTask] = useState<FormErrorsTask>({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    const reset = () => {
      setFormDataTask({ name: '', pets: [], time: '', hour: null, frequency: '', requiredNote: '' })
      setErrorsTask({})
      setOtherFrequency('')
      setFrequency('')
      setErrorOtherFrequency(null)
    }

    const handleClose = () => {
        onClose();
        reset()
    }

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataTask;
        setFormDataTask(prev => ({ ...prev, [name]: value}));
        if(validName === 'frequency' && typeof value === 'string'){
          setFrequency(value);
        }
        if(errorsTask[name as keyof typeof errorsTask]){
            setErrorsTask(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const validate = (): boolean => {
      const newErrorsTask: FormErrorsTask = {};
      if(!formDataTask.name) newErrorsTask.name = "Vui lòng nhập tên công việc";
      if(formDataTask.pets.length === 0) newErrorsTask.pets = "Vui lòng chọn thú cưng";
      if(!formDataTask.time) newErrorsTask.time = "Vui lòng chọn thời điểm";
      if(!formDataTask.hour) newErrorsTask.hour = "Vui lòng chọn giờ";
      if(!formDataTask.frequency) newErrorsTask.frequency = "Vui lòng chọn tần suất";
      if(!formDataTask.requiredNote) newErrorsTask.requiredNote = "Vui lòng nhập yêu cầu";
      setErrorsTask(newErrorsTask);
      return Object.keys(newErrorsTask).length === 0 ;
    }

    const handleSave = async() => {
      if(!validate()){
        return
      }
      if(!otherFrequency && formDataTask.frequency === 'others'){
        setErrorOtherFrequency("Vui lòng nhập tần suất khác");
        return
      }
      setIsSubmitting(true)
      try {
        const payload: PayloadTask = {
          name: formDataTask.name,
          petIds: formDataTask.pets.map(el => el.id),
          time: formDataTask.time,
          hour: formDataTask.hour,
          frequency: formDataTask.frequency,
          otherFrequency: otherFrequency ? otherFrequency : null,
          requiredNote: formDataTask.requiredNote
        }
        console.log("payload: ", payload);
        const res = await createTask(payload);
        notify({
          message: res.message,
          severity: 'success'
        })
        handleClose()
      } catch (error: any) {
        notify({
          message: error.message,
          severity: 'error'
        })
      } finally{
        setIsSubmitting(false)
      }
    }
    return (
      <DialogComponent
        dialogKey={open}
        handleClose={handleClose}
        dialogTitle='Tạo công việc mới'
        isActiveFooter={false}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <InputText
              label=''
              name='name'
              type='text'
              value={formDataTask.name}
              onChange={handleInputChange}
              placeholder='Công việc *'
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
              getRenderOption={(option) => (
                <>
                  <img
                    alt={option.nameAvatar}
                    loading="lazy"
                    width="20" height={20}
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
              placeholder='Tuần suất'
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
                placeholder="Nhập tuần suất khác"
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
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
                onClick={handleSave}
                sx={{ bgcolor: COLORS.PRIMARY }}
            >
                Tạo mới
            </Button>
            <Button
                onClick={handleClose}
                variant="outlined"
                sx={{ border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY}}
            >
                Hủy
            </Button>
          </Grid>
        </Grid>
        {isSubmitting && <Backdrop open={isSubmitting}/>}
      </DialogComponent>
    );
}

export default CreateTask
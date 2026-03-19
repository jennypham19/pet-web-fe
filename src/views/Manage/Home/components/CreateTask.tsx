import { useEffect, useState } from "react";



import Grid from "@mui/material/Grid2";
import DialogComponent from "@/components/DialogComponent";
import InputMaskTextField from "@/components/InputMaskTextField";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";



import { getPets } from "@/services/pet-service";
import { IPet } from "@/types/pet";
import { Button } from "@mui/material";
import { COLORS } from "@/constants/colors";


interface CreateTaskProps{
    open: boolean,
    onClose: () => void;
}

const CreateTask = (props: CreateTaskProps) => {
    const { open, onClose } = props;
    const [pets, setPets] = useState<IPet[]>([]);
    const [hour, setHour] = useState<string>('')

    useEffect(() => {
        if(open){
            const getListPets = async() => {
                const res = await getPets({ page: 1, limit: 20 });
                const data = res.data?.data as any as IPet[];
                setPets(data)
            }

            getListPets();
        }
    }, [open])
    const handleClose = () => {
        onClose()
    }

    const handleInputChange = (name: string, value: any) => {

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
              value={''}
              onChange={handleInputChange}
              placeholder='Công việc *'
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputSelect
              label=''
              onChange={handleInputChange}
              name='pets'
              options={pets}
              value={''}
              transformOptions={(data) =>
                data.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              }
              placeholder='Thú cưng *'
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputSelect
              label=''
              onChange={handleInputChange}
              name='time'
              value={''}
              options={[
                { id: 1, label: 'Buổi sáng', value: 'morning' },
                { id: 2, label: 'Buổi trưa', value: 'noontime' },
                { id: 3, label: 'Buổi chiều', value: 'afternoon' },
                { id: 4, label: 'Buổi tối', value: 'evening' },
              ]}
              placeholder='Thời điểm'
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputMaskTextField 
                mask='99:99' 
                value={hour} 
                onChange={(e) => { setHour(e)}}
                placeholder='Thời gian' 
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputSelect
              label=''
              name='frequency'
              value={''}
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
            />
          </Grid>
          {/* <Grid size={{ xs: 12 }}></Grid> */}
          <Grid size={{ xs: 12 }}>
            <InputText
                label=""
                name="requiredNote"
                value={''}
                onChange={handleInputChange}
                type="text"
                multiline
                rows={3}
                placeholder="Yêu cầu *"
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
                sx={{ bgcolor: COLORS.PRIMARY }}
            >
                Tạo mới
            </Button>
            <Button
                variant="outlined"
                sx={{ border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY}}
            >
                Hủy
            </Button>
          </Grid>
        </Grid>
      </DialogComponent>
    );
}

export default CreateTask
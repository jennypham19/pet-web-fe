import dayjs from "dayjs";



import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";



import { FormErrorsVaccination } from "@/types/errors";
import { FormDataVaccination } from "@/types/pet";


interface VaccinationProps{
    onInputChange: (name: string, value: any) => void;
    formDataVaccination: FormDataVaccination;
    errorVaccination: FormErrorsVaccination;
}

const Vaccination = (props: VaccinationProps) => {
    const { onInputChange, formDataVaccination, errorVaccination } = props;

    return (
      <Grid container spacing={1}>
        <Typography variant='subtitle2' fontWeight={500}>
          Tiêm phòng
        </Typography>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataVaccination.medicationName}
            type='text'
            name='medicationName'
            onChange={onInputChange}
            placeholder='Tên thuốc *'
            error={!!errorVaccination.medicationName}
            helperText={errorVaccination.medicationName}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataVaccination.firstDoseDate}
            type='date'
            name='firstDoseDate'
            onChange={onInputChange}
            placeholder='Ngày bắt đầu tiêm'
            error={!!errorVaccination.firstDoseDate}
            helperText={errorVaccination.firstDoseDate}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataVaccination.boosterDate}
            type='date'
            name='boosterDate'
            onChange={onInputChange}
            placeholder='Ngày tiêm nhắc lại'
            error={!!errorVaccination.boosterDate}
            helperText={errorVaccination.boosterDate}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataVaccination.adverseReaction}
            type='text'
            name='adverseReaction'
            onChange={onInputChange}
            placeholder='Kết quả phản ứng'
            multiline
            rows={3}
            error={!!errorVaccination.adverseReaction}
            helperText={errorVaccination.adverseReaction}
          />
        </Grid>
      </Grid>
    );
}

export default Vaccination;
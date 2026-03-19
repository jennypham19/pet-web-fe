import dayjs from "dayjs";



import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";



import { FormErrorsRegularVetCheckup } from "@/types/errors";
import { FormDataRegularVetCheckup } from "@/types/pet";


interface RegularVetCheckupProps{
    onInputChange: (name: string, value: any) => void;
    formDataRegularVetCheckup: FormDataRegularVetCheckup;
    errorRegularVetCheckup: FormErrorsRegularVetCheckup
}

const RegularVetCheckup = (props: RegularVetCheckupProps) => {
    const { onInputChange, formDataRegularVetCheckup, errorRegularVetCheckup } = props;

    return (
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='subtitle2' fontWeight={500}>
            Khám định kỳ thú cưng
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataRegularVetCheckup.examinationDate}
            type='date'
            name='examinationDate'
            onChange={onInputChange}
            placeholder='Ngày khám'
            error={!!errorRegularVetCheckup.examinationDate}
            helperText={errorRegularVetCheckup.examinationDate}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataRegularVetCheckup.recheckDate}
            type='date'
            name='recheckDate'
            onChange={onInputChange}
            placeholder='Ngày khám lại'
            error={!!errorRegularVetCheckup.recheckDate}
            helperText={errorRegularVetCheckup.recheckDate}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataRegularVetCheckup.healthCondition}
            type='text'
            name='healthCondition'
            onChange={onInputChange}
            placeholder='Tình trạng sức khỏe *'
            multiline
            rows={3}
            error={!!errorRegularVetCheckup.healthCondition}
            helperText={errorRegularVetCheckup.healthCondition}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataRegularVetCheckup.conclusion}
            type='text'
            name='conclusion'
            onChange={onInputChange}
            placeholder='Kết luận *'
            multiline
            rows={3}
            error={!!errorRegularVetCheckup.conclusion}
            helperText={errorRegularVetCheckup.conclusion}
          />
        </Grid>
      </Grid>
    );
}

export default RegularVetCheckup;
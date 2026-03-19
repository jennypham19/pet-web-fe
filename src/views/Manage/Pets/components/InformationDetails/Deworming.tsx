import dayjs from "dayjs";



import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";



import { FormErrorsDeworming } from "@/types/errors";
import { FormDataDeworming } from "@/types/pet";


interface DewormingProps{
    onInputChange: (name: string, value: any) => void;
    formDataDeworming: FormDataDeworming;
    errorDeworming: FormErrorsDeworming;
}

const Deworming = (props: DewormingProps) => {
    const { onInputChange, formDataDeworming, errorDeworming } = props;

    return (
      <Grid container spacing={1}>
        <Typography variant='subtitle2' fontWeight={500}>
          Tẩy giun
        </Typography>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataDeworming.medicationName}
            type='text'
            name='medicationName'
            onChange={onInputChange}
            placeholder='Tên thuốc *'
            error={!!errorDeworming.medicationName}
            helperText={errorDeworming.medicationName}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataDeworming.dosage}
            type='text'
            name='dosage'
            onChange={onInputChange}
            placeholder='Liều lượng *'
            error={!!errorDeworming.dosage}
            helperText={errorDeworming.dosage}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataDeworming.dewormingDate}
            type='date'
            name='dewormingDate'
            onChange={onInputChange}
            placeholder='Ngày tẩy giun'
            error={!!errorDeworming.dewormingDate}
            helperText={errorDeworming.dewormingDate}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataDeworming.nextDewormingDate}
            type='date'
            name='nextDewormingDate'
            onChange={onInputChange}
            placeholder='Ngày tẩy lại'
            error={!!errorDeworming.nextDewormingDate}
            helperText={errorDeworming.nextDewormingDate}
          />
        </Grid>
      </Grid>
    );
}

export default Deworming;
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";



import { FormErrorsHealthPet } from "@/types/errors";
import { FormDataInfoHealthPet } from "@/types/pet";


interface PetHealthInformationProps{
    onInputChange: (name: string, value: any) => void;
    formDataInforHealthPet: FormDataInfoHealthPet;
    errorInfoHealthPet: FormErrorsHealthPet
}

const PetHealthInformation = (props: PetHealthInformationProps) => {
    const { onInputChange, formDataInforHealthPet, errorInfoHealthPet } = props;

    return (
      <Grid container spacing={1}>
        <Typography variant='subtitle2' fontWeight={500}>
          Thông tin y tế thú cưng
        </Typography>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataInforHealthPet.clinicName}
            type='text'
            name='clinicName'
            onChange={onInputChange}
            placeholder='Tên phòng khám *'
            error={!!errorInfoHealthPet.clinicName}
            helperText={errorInfoHealthPet.clinicName}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataInforHealthPet.address}
            type='text'
            name='address'
            onChange={onInputChange}
            placeholder='Địa chỉ *'
            error={!!errorInfoHealthPet.address}
            helperText={errorInfoHealthPet.address}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataInforHealthPet.phone}
            type='text'
            name='phone'
            onChange={onInputChange}
            placeholder='Số điện thoại *'
            error={!!errorInfoHealthPet.phone}
            helperText={errorInfoHealthPet.phone}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataInforHealthPet.attendingVet}
            type='text'
            name='attendingVet'
            onChange={onInputChange}
            placeholder='Bác sĩ điều trị *'
            error={!!errorInfoHealthPet.attendingVet}
            helperText={errorInfoHealthPet.attendingVet}
          />
        </Grid>
      </Grid>
    );
}

export default PetHealthInformation;
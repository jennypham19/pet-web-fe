import dayjs from "dayjs";



import { Box, InputAdornment, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";



import { FormErrorsInfoPet } from "@/types/errors";
import { FormDataInfoPet } from "@/types/pet";
import IconButton from "@/components/IconButton/IconButton";
import { Close } from "@mui/icons-material";


interface PetInformationProps{
    onInputChange: (name: string, value: any) => void;
    formDataInfoPet: FormDataInfoPet;
    errorInfoPet: FormErrorsInfoPet
}

const PetInformation = (props: PetInformationProps) => {
    const { onInputChange, formDataInfoPet, errorInfoPet } = props;
    
    return (
      <Grid container spacing={1}>
        <Typography variant='subtitle2' fontWeight={500}>
          Thông tin thú cưng *
        </Typography>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            name='name'
            type='text'
            value={formDataInfoPet.name}
            placeholder='Tên thú cưng *'
            onChange={onInputChange}
            error={!!errorInfoPet.name}
            helperText={errorInfoPet.name}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputSelect
            label=''
            name='sex'
            value={formDataInfoPet.sex}
            placeholder='Giới tính *'
            onChange={onInputChange}
            options={[
              { id: 1, label: 'Cái', value: 'female' },
              { id: 1, label: 'Đực', value: 'male' },
            ]}
            error={!!errorInfoPet.sex}
            helperText={errorInfoPet.sex}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            type='date'
            value={formDataInfoPet.dob}
            name='dob'
            onChange={onInputChange}
            placeholder='Ngày sinh'
            // error={!!errorInfoPet.dob}
            // helperText={errorInfoPet.dob}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputSelect
            label=''
            value={formDataInfoPet.type}
            options={[
              { id: 1, label: 'Chó', value: 'dog' },
              { id: 2, label: 'Mèo', value: 'cat' }
            ]}
            name='type'
            onChange={onInputChange}
            placeholder='Động vật *'
            error={!!errorInfoPet.type}
            helperText={errorInfoPet.type}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            type='text'
            value={formDataInfoPet.species}
            name='species'
            onChange={onInputChange}
            placeholder='Loài *'
            error={!!errorInfoPet.species}
            helperText={errorInfoPet.species}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            type='text'
            value={formDataInfoPet.breedingStatus}
            name='breedingStatus'
            onChange={onInputChange}
            placeholder='Tình trạng sinh sản *'
            error={!!errorInfoPet.breedingStatus}
            helperText={errorInfoPet.breedingStatus}
          />
        </Grid>
      </Grid>
    );
}

export default PetInformation;
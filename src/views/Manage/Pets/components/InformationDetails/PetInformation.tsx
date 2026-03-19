import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

interface PetInformationProps{
    onInputChange: (name: string, value: any) => void;
}

const PetInformation = (props: PetInformationProps) => {
    const { onInputChange } = props;
    return(
        <Grid container spacing={1}>
            <Typography variant="subtitle2" fontWeight={500}>Thông tin thú cưng *</Typography>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    name="name"
                    type="text"
                    value={''}
                    placeholder="Tên thú cưng *"
                    onChange={onInputChange}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputSelect
                    label=""
                    name="sex"
                    value={''}
                    placeholder="Giới tính *"
                    onChange={onInputChange}
                    options={[
                        { id: 1, label: 'Cái', value: 'femail' },
                        { id: 1, label: 'Đực', value: 'femail' },
                    ]}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    type="date"
                    value={dayjs()}
                    name="dob"
                    onChange={onInputChange}
                    placeholder="Ngày sinh"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    type="text"
                    value={''}
                    name="species"
                    onChange={onInputChange}
                    placeholder="Loài *"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    type="text"
                    value={''}
                    name="type"
                    onChange={onInputChange}
                    placeholder="Động vật *"
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    type="text"
                    value={''}
                    name="breedingStatus"
                    onChange={onInputChange}
                    placeholder="Tình trạng sinh sản *"
                />
            </Grid>
        </Grid>
    )
}

export default PetInformation;
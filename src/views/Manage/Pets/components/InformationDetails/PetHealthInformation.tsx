import InputText from "@/components/InputText";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"

interface PetHealthInformationProps{
    onInputChange: (name: string, value: any) => void;
}

const PetHealthInformation = (props: PetHealthInformationProps) => {
    const { onInputChange } = props;

    return (
        <Grid container spacing={1}>
            <Typography variant="subtitle2" fontWeight={500}>Thông tin y tế thú cưng</Typography>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Tên phòng khám *"
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Địa chỉ *"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Số điện thoại *"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Bác sĩ điều trị *"
                />
            </Grid>
        </Grid>
    )
}

export default PetHealthInformation;
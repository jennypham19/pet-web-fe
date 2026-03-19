import InputText from "@/components/InputText";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs from "dayjs";

interface VaccinationProps{
    onInputChange: (name: string, value: any) => void;
}

const Vaccination = (props: VaccinationProps) => {
    const { onInputChange } = props;

    return (
        <Grid container spacing={1}>
            <Typography variant="subtitle2" fontWeight={500}>Tiêm phòng</Typography>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Tên thuốc *"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={dayjs()}
                    type="date"
                    name=""
                    onChange={onInputChange}
                    placeholder="Ngày bắt đầu tiêm"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={dayjs()}
                    type="date"
                    name=""
                    onChange={onInputChange}
                    placeholder="Ngày tiêm nhắc lại"
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Kết quả phản ứng"
                    multiline
                    rows={3}
                />
            </Grid>
        </Grid>
    )
}

export default Vaccination;
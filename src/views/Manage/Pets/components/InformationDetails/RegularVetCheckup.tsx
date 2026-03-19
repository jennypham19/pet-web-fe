import InputText from "@/components/InputText";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs from "dayjs";

interface RegularVetCheckupProps{
    onInputChange: (name: string, value: any) => void;
}

const RegularVetCheckup = (props: RegularVetCheckupProps) => {
    const { onInputChange } = props;

    return (
        <Grid container spacing={1}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" fontWeight={500}>Khám định kỳ thú cưng</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={dayjs()}
                    type="date"
                    name=""
                    onChange={onInputChange}
                    placeholder="Ngày khám"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={dayjs()}
                    type="date"
                    name=""
                    onChange={onInputChange}
                    placeholder="Ngày khám lại"
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Tình trạng sức khỏe *"
                    multiline
                    rows={3}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Kết luận *"
                    multiline
                    rows={3}
                />
            </Grid>
        </Grid>
    )
}

export default RegularVetCheckup;
import InputText from "@/components/InputText";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs from "dayjs";

interface DewormingProps{
    onInputChange: (name: string, value: any) => void;
}

const Deworming = (props: DewormingProps) => {
    const { onInputChange } = props;

    return (
        <Grid container spacing={1}>
            <Typography variant="subtitle2" fontWeight={500}>Tẩy giun</Typography>
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
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Liều lượng *"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={dayjs()}
                    type="date"
                    name=""
                    onChange={onInputChange}
                    placeholder="Ngày tẩy giun"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={dayjs()}
                    type="date"
                    name=""
                    onChange={onInputChange}
                    placeholder="Ngày tẩy lại"
                />
            </Grid>
        </Grid>
    )
}

export default Deworming;
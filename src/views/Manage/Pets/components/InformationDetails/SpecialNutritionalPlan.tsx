import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"

interface SpecialNutritionalPlanProps{
    onInputChange: (name: string, value: any) => void;
}

const SpecialNutritionalPlan = (props: SpecialNutritionalPlanProps) => {
    const { onInputChange } = props;

    return (
        <Grid container spacing={1}>
            <Typography variant="subtitle2" fontWeight={500}>Chế độ dinh dưỡng đặc biệt</Typography>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Thức ăn *"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Số lượng *"           
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputSelect
                    label=""
                    value={''}
                    name=""
                    onChange={onInputChange}
                    placeholder="Tần suất"
                    options={[
                        { id: 1, label: '1 bữa/ngày', value: 'one_meal'},
                        { id: 2, label: '2 bữa/ngày', value: 'two_meals'},
                        { id: 3, label: '3 bữa/ngày', value: 'three_meals'},
                        { id: 4, label: '4 bữa/ngày', value: 'four_meals'},
                        { id: 5, label: '5 bữa/ngày', value: 'five_meals'}
                    ]}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    value={''}
                    type="text"
                    name=""
                    onChange={onInputChange}
                    placeholder="Bổ sung thêm dinh dưỡng *"    
                    multiline
                    rows={3}       
                />
            </Grid>
        </Grid>
    )
}

export default SpecialNutritionalPlan;
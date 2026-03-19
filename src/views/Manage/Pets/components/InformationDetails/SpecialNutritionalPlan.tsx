import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";



import { FormErrorsSpecialNutritionalPlan } from "@/types/errors";
import { FormDataSpecialNutritionalPlan } from "@/types/pet";


interface SpecialNutritionalPlanProps {
  onInputChange: (name: string, value: any) => void;
  formDataSpecialNutritionalPlan: FormDataSpecialNutritionalPlan;
  errorSpecialNutritionalPlan: FormErrorsSpecialNutritionalPlan
}

const SpecialNutritionalPlan = (props: SpecialNutritionalPlanProps) => {
    const { onInputChange, formDataSpecialNutritionalPlan, errorSpecialNutritionalPlan } = props;

    return (
      <Grid container spacing={1}>
        <Typography variant='subtitle2' fontWeight={500}>
          Chế độ dinh dưỡng đặc biệt
        </Typography>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataSpecialNutritionalPlan.food}
            type='text'
            name='food'
            onChange={onInputChange}
            placeholder='Thức ăn *'
            error={!!errorSpecialNutritionalPlan.food}
            helperText={errorSpecialNutritionalPlan.food}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputText
            label=''
            value={formDataSpecialNutritionalPlan.amount}
            type='text'
            name='amount'
            onChange={onInputChange}
            placeholder='Số lượng *'
            error={!!errorSpecialNutritionalPlan.amount}
            helperText={errorSpecialNutritionalPlan.amount}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputSelect
            label=''
            value={formDataSpecialNutritionalPlan.frequency}
            name='frequency'
            onChange={onInputChange}
            placeholder='Tần suất'
            options={[
              { id: 1, label: '1 bữa/ngày', value: 'one_meal' },
              { id: 2, label: '2 bữa/ngày', value: 'two_meals' },
              { id: 3, label: '3 bữa/ngày', value: 'three_meals' },
              { id: 4, label: '4 bữa/ngày', value: 'four_meals' },
              { id: 5, label: '5 bữa/ngày', value: 'five_meals' },
            ]}
            error={!!errorSpecialNutritionalPlan.frequency}
            helperText={errorSpecialNutritionalPlan.frequency}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InputText
            label=''
            value={formDataSpecialNutritionalPlan.nutritionalSupplements}
            type='text'
            name='nutritionalSupplements'
            onChange={onInputChange}
            placeholder='Bổ sung thêm dinh dưỡng *'
            multiline
            rows={3}
            error={!!errorSpecialNutritionalPlan.nutritionalSupplements}
            helperText={errorSpecialNutritionalPlan.nutritionalSupplements}
          />
        </Grid>
      </Grid>
    );
}

export default SpecialNutritionalPlan;
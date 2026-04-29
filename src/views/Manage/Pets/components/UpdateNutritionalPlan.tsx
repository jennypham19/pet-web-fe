import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { FormErrorsSpecialNutritionalPlan } from "@/types/errors";
import { FormDataSpecialNutritionalPlan } from "@/types/pet";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

interface UpdateNutritionalPlanProps{
    onClose: () => void;
}

const UpdateNutritionalPlan = (props: UpdateNutritionalPlanProps) => {
    const { onClose } = props;
    const notify = useNotification();
    const [formDataNutritionalPlan, setFormDataNutritionalPlan] = useState<FormDataSpecialNutritionalPlan>({
        food: '', amount: '', frequency: '', nutritionalSupplements: ''
    })
    const [errorsNutritionalPlan, setErrorsNutritionalPlan] = useState<FormErrorsSpecialNutritionalPlan>({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reset = () => {
        setFormDataNutritionalPlan({
            food: '', amount: '', frequency: '', nutritionalSupplements: ''
        })
        setErrorsNutritionalPlan({})
    }

    const handleClose = () => {
        reset();
        onClose()
    }

    const handleChangeInputUpdateNutritionalPlan = (name: string, value: any) => {
      setFormDataNutritionalPlan(prev => ({ ...prev, [name]: value }));
      if(errorsNutritionalPlan[name as keyof typeof errorsNutritionalPlan]){
        setErrorsNutritionalPlan(prev => ({ ...prev, [name]: undefined }))
      }
    }

    const validate = () : boolean => {
        const newErrors: FormErrorsSpecialNutritionalPlan = {};
        if(!formDataNutritionalPlan.food) newErrors.food = "Vui lòng nhập thức ăn";
        if(!formDataNutritionalPlan.amount) newErrors.amount = "Vui lòng nhập số lượng";
        if(!formDataNutritionalPlan.frequency) newErrors.frequency = "Vui lòng nhập tần suất";
        if(!formDataNutritionalPlan.nutritionalSupplements) newErrors.nutritionalSupplements = "Vui lòng nhập bổ sung thêm dinh dưỡng";
        
        setErrorsNutritionalPlan(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSaveNutritionalPlan = async() => {
        if(!validate()){
            return;
        }
        setIsSubmitting(true);
        try {
            
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return(
        <Grid container spacing={2}>
            <Grid size={{ md: 6 }}>
                <Typography fontWeight={600} variant="subtitle2">THỨC ĂN</Typography>
                <InputText
                    label=""
                    name="food"
                    value={formDataNutritionalPlan.food}
                    onChange={handleChangeInputUpdateNutritionalPlan}
                    type="text"
                    error={!!errorsNutritionalPlan.food}
                    helperText={errorsNutritionalPlan.food}
                    margin="dense"
                    multiline
                    rows={5}
                />
            </Grid>
            <Grid size={{ md: 6 }}>
                <Typography fontWeight={600} variant="subtitle2">SỐ LƯỢNG</Typography>
                <InputText
                    label=""
                    name="amount"
                    value={formDataNutritionalPlan.amount}
                    onChange={handleChangeInputUpdateNutritionalPlan}
                    type="text"
                    error={!!errorsNutritionalPlan.amount}
                    helperText={errorsNutritionalPlan.amount}
                    margin="dense"
                />
            </Grid>
            <Grid size={{ md: 6 }}>
                <Typography fontWeight={600} variant="subtitle2">TẦN SUẤT</Typography>
                <InputSelect
                    label=''
                    value={formDataNutritionalPlan.frequency}
                    name='frequency'
                    onChange={handleChangeInputUpdateNutritionalPlan}
                    placeholder='Tần suất'
                    options={[
                        { id: 1, label: '1 bữa/ngày', value: 'one_meal' },
                        { id: 2, label: '2 bữa/ngày', value: 'two_meals' },
                        { id: 3, label: '3 bữa/ngày', value: 'three_meals' },
                        { id: 4, label: '4 bữa/ngày', value: 'four_meals' },
                        { id: 5, label: '5 bữa/ngày', value: 'five_meals' },
                    ]}
                    error={!!errorsNutritionalPlan.frequency}
                    helperText={errorsNutritionalPlan.frequency}
                    margin='dense'
                />
            </Grid>
            <Grid size={{ md: 6 }}>
                <Typography fontWeight={600} variant="subtitle2">BỔ SUNG THÊM DINH DƯỠNG</Typography>
                <InputText
                    label=""
                    name="nutritionalSupplements"
                    value={formDataNutritionalPlan.nutritionalSupplements}
                    onChange={handleChangeInputUpdateNutritionalPlan}
                    type="text"
                    error={!!errorsNutritionalPlan.nutritionalSupplements}
                    helperText={errorsNutritionalPlan.nutritionalSupplements}
                    margin="dense"
                    multiline
                    rows={5}
                />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', gap: 2 }} size={{ md: 12 }}>
                <Button
                    onClick={handleSaveNutritionalPlan}
                    sx={{ bgcolor: COLORS.PRIMARY }}
                >
                    Lưu
                </Button>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY }}
                >
                    Hủy
                </Button>
            </Grid>
        </Grid>
    )
}

export default UpdateNutritionalPlan;
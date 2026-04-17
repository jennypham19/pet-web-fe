import Backdrop from "@/components/Backdrop";
import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { addPetVaccination } from "@/services/pet-service";
import { FormErrorsVaccination } from "@/types/errors";
import { FormDataVaccination, PayloadDataVaccination } from "@/types/pet";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { useState } from "react";

interface AddVaccinationProps{
    open: boolean,
    onClose: () => void;
    id: string;
    onReload: () => void;
}

const AddVaccination = (props: AddVaccinationProps) => {
    const { open, onClose, id, onReload } = props;
    const notify = useNotification();
    const [formData, setFormData] = useState<FormDataVaccination>({ medicationName: '', firstDoseDate: null, boosterDate: null, adverseReaction: '' });
    const [errors, setErrors] = useState<FormErrorsVaccination>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        onClose()
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    const validate = () : boolean => {
        const newErrors: FormErrorsVaccination = {};
        if(!formData.medicationName) newErrors.medicationName = 'Vui lòng nhập tên thuốc';
        if(!formData.firstDoseDate) newErrors.firstDoseDate = 'Vui lòng chọn ngày bắt đầu tiêm';
        if(!formData.boosterDate) newErrors.boosterDate = 'Vui lòng chọn ngày tiêm nhắc lại';
        if(!formData.adverseReaction) newErrors.adverseReaction = 'Vui lòng nhập kết quản phản ứng';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validate()) {
            return;
        }
        setIsSubmitting(true);
        try {
            const payload: PayloadDataVaccination = {
                idPet: id,
                medicationName: formData.medicationName,
                firstDoseDate: formData.firstDoseDate,
                boosterDate: formData.boosterDate,
                adverseReaction: formData.adverseReaction
            }
            const res = await addPetVaccination(payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            onReload()
            handleClose();
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
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            dialogTitle="Thêm lịch tiêm"
            isIcon={false}
            isCenter={true}
            customButtons={
                <Button
                    onClick={handleSave}
                    sx={{ bgcolor: COLORS.PRIMARY }}
                >
                    Lưu
                </Button>
            }
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Tên thuốc</Typography>
                    <InputText
                        label=""
                        name="medicationName"
                        value={formData.medicationName}
                        type="text"
                        onChange={handleInputChange}
                        error={!!errors.medicationName}
                        helperText={errors.medicationName}
                        margin="dense"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Ngày tiêm</Typography>
                    <InputText
                        label=""
                        name="firstDoseDate"
                        value={formData.firstDoseDate}
                        type="date"
                        onChange={handleInputChange}
                        error={!!errors.firstDoseDate}
                        helperText={errors.firstDoseDate}
                        margin="dense"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Ngày tiêm nhắc lại</Typography>
                    <InputText
                        label=""
                        name="boosterDate"
                        value={formData.boosterDate}
                        type="date"
                        onChange={handleInputChange}
                        error={!!errors.boosterDate}
                        helperText={errors.boosterDate}
                        margin="dense"
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Kết quả phản ứng</Typography>
                    <InputText
                        label=""
                        name="adverseReaction"
                        value={formData.adverseReaction}
                        type="text"
                        onChange={handleInputChange}
                        error={!!errors.adverseReaction}
                        helperText={errors.adverseReaction}
                        margin="dense"
                        multiline
                        rows={5}
                    />
                </Grid>
            </Grid>
            {isSubmitting && (
                <Backdrop open={isSubmitting} />
            )}
        </DialogComponent>
    )
}

export default AddVaccination;
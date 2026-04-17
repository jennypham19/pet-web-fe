import Backdrop from "@/components/Backdrop";
import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { addPetDeworming, addPetVaccination } from "@/services/pet-service";
import { FormErrorsDeworming, FormErrorsVaccination } from "@/types/errors";
import { FormDataDeworming, FormDataVaccination, PayloadDataDeworming, PayloadDataVaccination } from "@/types/pet";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { useState } from "react";

interface AddDewormingProps{
    open: boolean,
    onClose: () => void;
    id: string;
    onReload: () => void;
}

const AddDeworming = (props: AddDewormingProps) => {
    const { open, onClose, id, onReload } = props;
    const notify = useNotification();
    const [formData, setFormData] = useState<FormDataDeworming>({ medicationName: '', dosage: '', dewormingDate: null, nextDewormingDate: null });
    const [errors, setErrors] = useState<FormErrorsDeworming>({});
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
        const newErrors: FormErrorsDeworming = {};
        if(!formData.medicationName) newErrors.medicationName = 'Vui lòng nhập tên thuốc';
        if(!formData.dosage) newErrors.dosage = 'Vui lòng nhập liều lượng';
        if(!formData.dewormingDate) newErrors.dewormingDate = 'Vui lòng chọn ngày tẩy';
        if(!formData.nextDewormingDate) newErrors.nextDewormingDate = 'Vui lòng chọn ngày tẩy nhắc lại';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validate()) {
            return;
        }
        setIsSubmitting(true);
        try {
            const payload: PayloadDataDeworming = {
                idPet: id,
                medicationName: formData.medicationName,
                dosage: formData.dosage,
                dewormingDate: formData.dewormingDate,
                nextDewormingDate: formData.nextDewormingDate
            }
            const res = await addPetDeworming(payload);
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
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Liều lượng</Typography>
                    <InputText
                        label=""
                        name="dosage"
                        value={formData.dosage}
                        type="text"
                        onChange={handleInputChange}
                        error={!!errors.dosage}
                        helperText={errors.dosage}
                        margin="dense"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Ngày tẩy</Typography>
                    <InputText
                        label=""
                        name="dewormingDate"
                        value={formData.dewormingDate}
                        type="date"
                        onChange={handleInputChange}
                        error={!!errors.dewormingDate}
                        helperText={errors.dewormingDate}
                        margin="dense"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Ngày tẩy nhắc lại</Typography>
                    <InputText
                        label=""
                        name="nextDewormingDate"
                        value={formData.nextDewormingDate}
                        type="date"
                        onChange={handleInputChange}
                        error={!!errors.nextDewormingDate}
                        helperText={errors.nextDewormingDate}
                        margin="dense"
                    />
                </Grid>
            </Grid>
            {isSubmitting && (
                <Backdrop open={isSubmitting} />
            )}
        </DialogComponent>
    )
}

export default AddDeworming;
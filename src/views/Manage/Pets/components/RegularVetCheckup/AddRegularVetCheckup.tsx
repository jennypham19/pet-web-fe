import Backdrop from "@/components/Backdrop";
import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { addPetDeworming, addPetRegularVetCheckup, addPetVaccination } from "@/services/pet-service";
import { FormErrorsDeworming, FormErrorsRegularVetCheckup, FormErrorsVaccination } from "@/types/errors";
import { FormDataDeworming, FormDataRegularVetCheckup, FormDataVaccination, PayloadDataDeworming, PayloadDataRegularVetCheckup, PayloadDataVaccination } from "@/types/pet";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { useState } from "react";

interface AddRegularVetCheckupProps{
    open: boolean,
    onClose: () => void;
    id: string;
    onReload: () => void;
}

const AddRegularVetCheckup = (props: AddRegularVetCheckupProps) => {
    const { open, onClose, id, onReload } = props;
    const notify = useNotification();
    const [formData, setFormData] = useState<FormDataRegularVetCheckup>({ examinationDate: null, recheckDate: null, healthCondition: '', conclusion: '' });
    const [errors, setErrors] = useState<FormErrorsRegularVetCheckup>({});
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
        const newErrors: FormErrorsRegularVetCheckup = {};
        if(!formData.examinationDate) newErrors.examinationDate = 'Vui lòng chọn ngày khám';
        if(!formData.recheckDate) newErrors.recheckDate = 'Vui lòng chọn ngày khám lại';
        if(!formData.healthCondition) newErrors.healthCondition = 'Vui lòng nhập tình trạng sức khỏe';
        if(!formData.conclusion) newErrors.conclusion = 'Vui lòng nhập kết luận';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validate()) {
            return;
        }
        setIsSubmitting(true);
        try {
            const payload: PayloadDataRegularVetCheckup = {
                idPet: id,
                examinationDate: formData.examinationDate,
                recheckDate: formData.recheckDate,
                healthCondition: formData.healthCondition,
                conclusion: formData.conclusion
            }
            const res = await addPetRegularVetCheckup(payload);
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
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Ngày khám</Typography>
                    <InputText
                        label=""
                        name="examinationDate"
                        value={formData.examinationDate}
                        type="date"
                        onChange={handleInputChange}
                        error={!!errors.examinationDate}
                        helperText={errors.examinationDate}
                        margin="dense"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Ngày khám nhắc lại</Typography>
                    <InputText
                        label=""
                        name="recheckDate"
                        value={formData.recheckDate}
                        type="date"
                        onChange={handleInputChange}
                        error={!!errors.recheckDate}
                        helperText={errors.recheckDate}
                        margin="dense"
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Tình trạng sức khỏe</Typography>
                    <InputText
                        label=""
                        name="healthCondition"
                        value={formData.healthCondition}
                        type="text"
                        onChange={handleInputChange}
                        error={!!errors.healthCondition}
                        helperText={errors.healthCondition}
                        margin="dense"
                        multiline
                        rows={5}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Kết luận</Typography>
                    <InputText
                        label=""
                        name="conclusion"
                        value={formData.conclusion}
                        type="text"
                        onChange={handleInputChange}
                        error={!!errors.conclusion}
                        helperText={errors.conclusion}
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

export default AddRegularVetCheckup;
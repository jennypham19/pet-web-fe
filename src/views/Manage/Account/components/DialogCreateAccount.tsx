import Backdrop from "@/components/Backdrop";
import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { createAccount } from "@/services/user-service";
import { FormDataAccount } from "@/types/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { useState } from "react";

interface DialogCreateAccountProps{
    open: boolean,
    onClose: () => void;
}

type FormErrors = {
    [K in keyof FormDataAccount]?: string
}

const DialogCreateAccount = (props: DialogCreateAccountProps) => {
    const { open, onClose } = props;
    const notify = useNotification();
    const [formData, setFormData] = useState<FormDataAccount>({ name: '', account: '', password: '', role: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const handleClose = () => {
        onClose();
        setFormData({ name: '', account: '', password: '', role: '' });
        setErrors({})
    }

    const validateSubmit = (): boolean => {
        const newErrors: FormErrors = {};
        if(!formData.name) newErrors.name = "Vui lòng nhập họ tên";
        if(!formData.account) newErrors.account = "Vui lòng nhập tài khoản";
        if(!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
        if(!formData.role) newErrors.role = "Vui lòng chọn vai trò";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validateSubmit()){
            return;
        }

        setIsSubmitting(true);
        try {
            const payload: FormDataAccount = {... formData}
            const res = await createAccount(payload); 
            notify({
                message: res.message,
                severity: 'success'
            });
            handleClose()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally{
            setIsSubmitting(false)
        }

        
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            dialogTitle="Tạo tài khoản"
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={500}>Họ tên</Typography>
                    <InputText
                        label=""
                        name="name"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.name}
                        sx={{ mt: 0.5 }}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={500}>Tài khoản</Typography>
                    <InputText
                        label=""
                        name="account"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.account}
                        sx={{ mt: 0.5 }}
                        error={!!errors.account}
                        helperText={errors.account}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={500}>Mật khẩu</Typography>
                    <InputText
                        label=""
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={handleInputChange}
                        value={formData.password}
                        sx={{ mt: 0.5 }}
                        endAdornment={(
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={500}>Vai trò</Typography>
                    <InputSelect
                        label=""
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        options={
                            [
                                { id: 1, label: 'Quản lý nhân sự', value: 'mod'},
                                { id: 2, label: 'Chuyên viên', value: 'specialist'},
                                { id: 2, label: 'Nhân viên', value: 'employee'},
                            ]
                        }
                        placeholder="Chọn vai trò"
                        sx={{ mt: 0.5 }}
                        error={!!errors.role}
                        helperText={errors.role}
                    />
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Button
                        onClick={handleSave}
                        variant="contained"
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
            {isSubmitting && (
                <Backdrop open={isSubmitting}/>
            )}
        </DialogComponent>
    )
};

export default DialogCreateAccount;
import { COLORS } from "@/constants/colors";
import { FormDataPassword, IUser, PayloadPassword } from "@/types/user";
import { FormatListBulleted, GppGood, Key, Lightbulb, Lock, RadioButtonUnchecked } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import useNotification from "@/hooks/useNotification";
import { useState } from "react";
import { FormErrorsPassword } from "@/types/errors";
import { changePasswordAccount } from "@/services/user-service";
import { STATUS_CODE } from "@/constants/statusCode";

const DATA = [
    {
        id: 1,
        icon: <RadioButtonUnchecked/>,
        label: 'Ít nhất 12 ký tự',
        title: 'Độ dài tối thiểu để chống lại các cuộc tấn công brute force.'
    },
    {
        id: 2,
        icon: <RadioButtonUnchecked/>,
        label: 'Có chữ hoa',
        title: 'Sử dụng ít nhất một ký tự viết hoa (A-Z).'
    },
    {
        id: 3,
        icon: <RadioButtonUnchecked/>,
        label: 'Có chữ số',
        title: 'Sử dụng ít nhất một chữ số (0-9).'
    },
    {
        id: 4,
        icon: <RadioButtonUnchecked/>,
        label: 'Có ký tự đặc biệt',
        title: 'Bao gồm các ký tự như !@#$%^&*.'
    }
]

interface ChangePasswordMobilePros{
    onClose: () => void;
    user: IUser
}

const ChangePasswordMobile = (props: ChangePasswordMobilePros) => {
    const { onClose, user } = props;
    const notify = useNotification();
    const [formData, setFormData] = useState<FormDataPassword>({ currentPassword: '', password: '', passwordConfirm: '' });
    const [errors, setErrors] = useState<FormErrorsPassword>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newPassword, setNewPassword] = useState<string | null>(null)

    const reset = () => {
        setFormData({ currentPassword: '', password: '', passwordConfirm: '' });
        setErrors({})
    }

    const handleClose = () => {
        onClose();
        reset();
    };

    const validate = (): boolean => {
        const newErrors: FormErrorsPassword = {};
        if(!formData.currentPassword) newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
        if(!formData.password) newErrors.password = "Vui lòng nhập mật khẩu mới";
        if(!formData.passwordConfirm) newErrors.passwordConfirm = "Vui lòng nhập xác nhận mật khẩu mới";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
        if(name === 'password' && typeof value === "string"){
            setNewPassword(value)
        }
        if(name === 'passwordConfirm' && typeof value === "string"){
            if(value !== newPassword){
                setErrors(prev => ({
                    ...prev,
                    passwordConfirm: 'Mật khẩu và mật khẩu nhập lại không khớp'
                }))
            }

        }
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    const handleSave = async() => {
        if(!validate()){
            return;
        }
        setIsSubmitting(true);
        try {
            const payload: PayloadPassword = {
                currentPassword: formData.currentPassword,
                password: formData.password
            }
            const res = await changePasswordAccount(user.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            handleClose()
        } catch (error: any) {
            if(error.statusCode === STATUS_CODE.BAD_REQUEST){
                setErrors((prev) => ({ ...prev, currentPassword: error.message}))
            }else{
                notify({
                    message: error.message,
                    severity: 'error'
                })                
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return(
        <Box>
            <Stack>
                <Typography 
                    variant="subtitle2"
                    sx={{
                        cursor: 'pointer',
                        
                    }}
                    component='a'
                    onClick={handleClose}
                >
                    QUAY LẠI
                </Typography>
                <Typography variant="subtitle2">{`>`}</Typography>
                <Typography variant="subtitle2">TÀI KHOẢN</Typography>
                <Typography variant="subtitle2">{`>`}</Typography>
                <Typography variant="subtitle2" sx={{ color: COLORS.PRIMARY }}>ĐỔI MẬT KHẨU</Typography>
            </Stack>
            <Grid sx={{ mt: 1 }} container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    {/* Mật khẩu */}
                    <Typography mt={1.5} variant="h4" fontWeight={600}>
                        Đổi mật khẩu hệ thống
                    </Typography>
                    <Typography mt={0.5} variant="subtitle1">
                        Thay đổi mật khẩu cho tài khoản <b>{user.account}</b>. Mật khẩu nên có ít nhất 12 ký tự bao gồm chữ cái, số và ký tự đặc biệt
                    </Typography>

                    {/* Hình ảnh */}
                    <Paper sx={{ p: 2, bgcolor: '#d8e2ee', borderRadius: 2, mt: 1 }}>
                        <Stack>
                            <FormatListBulleted/>
                            <Typography fontSize='14px' fontWeight={600}>Quy tắc bảo mật (Gợi ý)</Typography>
                        </Stack>
                        {DATA.map((data, idx) => (
                            <Box display='flex' flexGrow={1} my={1} key={idx} gap={2}>
                                {data.icon}
                                <Stack direction='column'>
                                    <Typography variant="caption">{data.label}</Typography>
                                    <Typography variant="caption" color="text.secondary">{data.title}</Typography>
                                </Stack>
                            </Box>
                        ))}
                        <Box display='flex' flexGrow={1} gap={1} mt={3} p={2} bgcolor='#eec3a7' borderRadius={2}>
                            <Lightbulb/>
                            <Stack direction='column'>
                                <Typography variant="caption">
                                    <b>Mẹo:</b> Sử dụng một cụm từ dễ nhớ nhưng khó đoán để tạo mật khẩu mạnh hơn thay vì các từ đơn lẻ.
                                </Typography>
                                <Typography variant="caption">
                                    Cập nhật mật khẩu định kỳ mỗi 90 ngày.
                                </Typography>
                            </Stack>
                        </Box>
                    </Paper>

                    {/* Đổi mật khẩu */}
                    <Paper sx={{ mt: 3,  p: 3, borderRadius: 2, bgcolor: '#fff' }}>
                        <Box display='flex' flexDirection='column'>
                            <Stack>
                                <Lock/>
                                <Typography variant="subtitle2">Mật khẩu hiện tại</Typography>
                            </Stack>
                            <InputText
                                label=""
                                placeholder="Nhập mật khẩu hiện tại"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                type="text"
                                margin="dense"
                                error={!!errors.currentPassword}
                                helperText={errors.currentPassword}
                            />
                        </Box>
                        <Box my={2} display='flex' flexDirection='column'>
                            <Stack>
                                <Key/>
                                <Typography variant="subtitle2">Mật khẩu mới</Typography>
                            </Stack>
                            <InputText
                                label=""
                                placeholder="Nhập mật khẩu mới"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                type="text"
                                margin="dense"
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <Stack>
                                <GppGood/>
                                <Typography variant="subtitle2">Xác nhận mật khẩu mới</Typography>
                            </Stack>
                            <InputText
                                label=""
                                placeholder="Nhập xác nhận mật khẩu mới"
                                name="passwordConfirm"
                                value={formData.passwordConfirm}
                                onChange={handleInputChange}
                                type="text"
                                margin="dense"
                                error={!!errors.passwordConfirm}
                                helperText={errors.passwordConfirm}
                            />
                        </Box>
                        <Box mt={4} display='flex' gap={2} justifyContent='center'>
                            <Button
                                onClick={handleSave}
                                sx={{
                                    borderRadius: 5, py: 1, width: 200,
                                    bgcolor: COLORS.PRIMARY
                                }}
                            >
                                Cập nhật mật khẩu
                            </Button>
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                sx={{
                                    borderRadius: 5, py: 1, width: 150,
                                    border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY
                                }}
                            >
                                Hủy bỏ
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ChangePasswordMobile;
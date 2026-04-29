import IconButton from "@/components/IconButton/IconButton";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { IUser, PayloadRole } from "@/types/user";
import { AdminPanelSettings, ArrowForward, Key, Security, ToggleOff, ToggleOn } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import ChangePasswordDesktop from "./ChangePasswordDesktop";
import useNotification from "@/hooks/useNotification";
import { activateAccount, changeRoleAccount, disableAccount, resetAccount } from "@/services/user-service";
import DialogConfirmPassword from "@/views/Manage/Account/components/DialogConfirmPassword";

interface UpdateAccountDesktopProps{
    onClose: () => void;
    user: IUser
}

const UpdateAccountDesktop = (props: UpdateAccountDesktopProps) => {
    const { onClose, user } = props;
    const theme = useTheme();
    const notify = useNotification();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [formData, setFormData] = useState<{name: string, account: string, role: string}>({ name: '', account: '', role: '' });
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
    const [data, setData] = useState<{name: string, account: string, password: string}>({ name: '', account: '', password: ''})

    useEffect(() => {
        setFormData({
            name: user.name,
            account: user.account,
            role: user.role
        })
    }, [user])

    const handleClose = () => {
        onClose()
        setFormData({ name: '', account: '', role: '' })
    }

    // kích hoạt tài khoản
    const handleActived = async(id: string) => {
        try {
            const res = await activateAccount(id);
            notify({ message: res.message, severity: 'success' });
            handleClose()
        } catch (error: any) {
            notify({ message: error.message, severity: 'error'})
        }
    }

    // vô hiệu hóa tài khoản
    const handleUnActived = async(id: string) => {
        try {
            const res = await disableAccount(id);
            notify({ message: res.message, severity: 'success' })
            handleClose()
        } catch (error: any) {
            notify({ message: error.message, severity: 'error'})
        }
    }

    const handleChangeInput = async(name: string, value: any) => {
        setFormData((prev) => ({ ...prev, role: value }))
        try {
            const payload: PayloadRole = {
                role: value
            }
            const res = await changeRoleAccount(user.id, payload)
            notify({
                message: res.message,
                severity: 'success'
            })
            handleClose()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const handleResetPassword = async(id: string) => {
        try {
            const res = await resetAccount(id);
            const data = res.data as any as {name: string, account: string, password: string}
            setData(data)
            notify({
                message: res.message,
                severity: 'success'
            })
            setOpenConfirmPassword(true)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    return(
        <Box p={3}>
            {!openChangePassword && (
                <>
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
                        <Typography variant="subtitle2" sx={{ color: COLORS.PRIMARY }}>CHỈNH SỬA</Typography>
                    </Stack>
                    <Typography mt={1.5} variant="h4" fontWeight={600}>
                        Chỉnh sửa tài khoản
                    </Typography>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography mt={0.5} variant="subtitle1">
                            Quản lý các thông số hệ thống và quyền hạn truy cập của nhân sự Pet
                        </Typography>
                        <Box display='flex' gap={2}>
                            <Button
                                onClick={() => handleResetPassword(user.id)}
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY, borderRadius: 3, px: 2 }}
                            >
                                Reset mật khẩu
                            </Button>
                        </Box>
                    </Box>
                    {/* Thông tin định danh & mật khẩu */}
                    <Grid sx={{ mt: 3 }} container spacing={2}>
                        {/* Thông tin định danh */}
                        <Grid size={{ xs: 8.5 }}>
                            <Paper sx={{ p: 2, mb: 3 }}>
                                <Stack mb={2}>
                                    <AdminPanelSettings sx={{ color: COLORS.PRIMARY }}/>
                                    <Typography variant="body1" fontWeight={600}>Thông tin định danh</Typography>
                                </Stack>
                                <Grid container spacing={2}>
                                    <Grid size={{ md: 4 }}>
                                        <Typography fontWeight={500} variant="subtitle2">Họ tên</Typography>
                                        <InputText
                                            label=""
                                            name="name"
                                            value={formData.name}
                                            type="text"
                                            onChange={() => {}}
                                            margin="dense"
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid size={{ md: 4 }}>
                                        <Typography fontWeight={500} variant="subtitle2">Tên đăng nhập</Typography>
                                        <InputText
                                            label=""
                                            name="account"
                                            value={formData.account}
                                            type="text"
                                            onChange={() => {}}
                                            margin="dense"
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid size={{ md: 4 }}>
                                        <Typography fontWeight={500} variant="subtitle2">Vai trò hệ thống</Typography>
                                        <InputSelect
                                            label=""
                                            name="role"
                                            options={[
                                                { id: 1, value: 'mod', label: 'Quản lý'},
                                                { id: 2, value: 'specialist', label: 'Chuyên viên'},
                                                { id: 3, value: 'employee', label: 'Nhân viên'}
                                            ]}
                                            value={formData.role}
                                            onChange={handleChangeInput}
                                            margin='dense'
                                        />
                                    </Grid>
                                    <Grid size={{ md: 12 }}>
                                        <Typography fontWeight={500} variant="subtitle2">Trạng thái tài khoản</Typography>
                                        <Paper sx={{ mt: 1, p: 2, bgcolor: '#d8e2ee', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {user.isActived === 1 ? (
                                                <Stack direction='column'>
                                                    <Typography variant="subtitle2" fontWeight={600}>Đang hoạt động (Active)</Typography>
                                                    <Typography variant="subtitle2">Cho phép người dùng đăng nhập vào hệ thống</Typography>
                                                </Stack> 
                                            ) : (
                                                <Stack direction='column'>
                                                    <Typography variant="subtitle2" fontWeight={600}>Không hoạt động (Unactive)</Typography>
                                                    <Typography variant="subtitle2">Vui lòng chờ quản trị viên kích hoạt</Typography>
                                                </Stack>
                                            )}
                                            {user.isActived === 1 ? (
                                                <IconButton
                                                    title="Vô hiệu xóa"
                                                    handleFunt={() => user && handleUnActived(user.id)}
                                                    icon={<ToggleOff color="error" sx={{ width: 30, height: 30 }}/>}
                                                />
                                            ) : (
                                                <IconButton
                                                    title="Kích hoạt"
                                                    handleFunt={() => user && handleActived(user.id)}
                                                    icon={<ToggleOn color="success" sx={{ width: 30, height: 30 }}/>}
                                                />
                                            )}
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper sx={{ p: 2 }}>
                                <Stack mb={2}>
                                    <Security sx={{ color: COLORS.PRIMARY }}/>
                                    <Typography variant="body1" fontWeight={600}>Bảo mật và xác thực</Typography>
                                </Stack>
                                <Paper sx={{ mt: 1, p: 2, bgcolor: '#d8e2ee', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Stack sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Key/>
                                        <Stack direction='column'>
                                            <Typography variant="subtitle2" fontWeight={600}>Đổi mật khẩu hệ thống</Typography>
                                            <Typography variant="subtitle2">Lần cuối thay đổi: 45 ngày trước</Typography>
                                        </Stack>
                                    </Stack> 
                                    <IconButton
                                        title="Đổi mật khẩu"
                                        handleFunt={() => { setOpenChangePassword(true) }}
                                        icon={<ArrowForward color="disabled"/>}
                                    />
                                </Paper>
                            </Paper>
                        </Grid>
                        {/* Mật khẩu */}
                        <Grid size={{ xs: 3.5 }}>

                        </Grid>
                    </Grid>                
                </>
            )}
            {openChangePassword && (
                <ChangePasswordDesktop
                    onClose={() => { setOpenChangePassword(false) }}
                    user={user}
                />
            )}
            {openConfirmPassword && data && (
                <DialogConfirmPassword
                    open={openConfirmPassword}
                    user={data}
                    handleClose={() => { setOpenConfirmPassword(false)}}
                />
            )}
        </Box>
    )

}

export default UpdateAccountDesktop;
import { COLORS } from "@/constants/colors";
import { IUser } from "@/types/user";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import password from "@/assets/images/users/password.png"
import { FormatListBulleted, GppGood, Key, Lightbulb, Lock, RadioButtonUnchecked } from "@mui/icons-material";
import InputText from "@/components/InputText";

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

interface ChangePasswordDesktopPros{
    onClose: () => void;
    user: IUser
}

const ChangePasswordDesktop = (props: ChangePasswordDesktopPros) => {
    const { onClose, user } = props;

    const handleClose = () => {
        onClose()
    };

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
            <Grid sx={{ mt: 3 }} container spacing={2}>
                {/* Mật khẩu */}
                <Grid sx={{ px: 2 }} size={{ md: 8.5 }}>
                    <Typography mt={1.5} variant="h4" fontWeight={600}>
                        Đổi mật khẩu hệ thống
                    </Typography>
                    <Typography mt={0.5} variant="subtitle1">
                        Thay đổi mật khẩu cho tài khoản <b>{user.account}</b>. Mật khẩu nên có ít nhất 12 ký tự bao gồm chữ cái, số và ký tự đặc biệt
                    </Typography>
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
                                value={''}
                                onChange={() => {}}
                                type="text"
                                margin="dense"
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
                                value={''}
                                onChange={() => {}}
                                type="text"
                                margin="dense"
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
                                value={''}
                                onChange={() => {}}
                                type="text"
                                margin="dense"
                            />
                        </Box>
                        <Box mt={4} display='flex' gap={2}>
                            <Button
                                sx={{
                                    borderRadius: 5, py: 1, width: 200,
                                    bgcolor: COLORS.PRIMARY
                                }}
                            >
                                Cập nhật mật khẩu
                            </Button>
                            <Button
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
                {/* Hình ảnh */}
                <Grid size={{ md: 3.5 }}>
                    <Paper sx={{ p: 2, bgcolor: '#d8e2ee', borderRadius: 2 }}>
                        <Stack>
                            <FormatListBulleted/>
                            <Typography fontSize='16px' fontWeight={600}>Quy tắc bảo mật (Gợi ý)</Typography>
                        </Stack>
                        {DATA.map((data, idx) => (
                            <Box display='flex' flexGrow={1} my={2} key={idx} gap={2}>
                                {data.icon}
                                <Stack direction='column'>
                                    <Typography variant="subtitle2">{data.label}</Typography>
                                    <Typography variant="caption" color="text.secondary">{data.title}</Typography>
                                </Stack>
                            </Box>
                        ))}
                        <Box display='flex' flexGrow={1} gap={1} mt={3} p={2} bgcolor='#eec3a7' borderRadius={2}>
                            <Lightbulb/>
                            <Typography variant="caption"><b>Mẹo:</b> Sử dụng một cụm từ dễ nhớ nhưng khó đoán để tạo mật khẩu mạnh hơn thay vì các từ đơn lẻ.</Typography>
                        </Box>
                    </Paper>
                    <Box
                        sx={{ 
                            mt: 3,
                            position: 'relative', 
                            borderRadius: 3, 
                            width: '100%', height: 300,
                            objectFit: 'cover',
                            backgroundImage: `url(${password})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                            <Box
                                py={1}
                                sx={{ position: 'absolute' }}
                                bottom={0}
                                left={0}
                            >
                                <Typography 
                                    variant="h6" 
                                    fontWeight={600} 
                                    px={2} 
                                    sx={{
                                       color:"#fff",
                                       textShadow:"0 0 5px rgba(0,0,0,0.5)"  
                                    }}
                                    
                                >
                                    Bảo vệ tài khoản
                                </Typography>
                                <Typography px={2} variant="caption" sx={{ color: '#fff' }}>
                                    Cập nhật mật khẩu định kỳ mỗi 90 ngày.
                                </Typography>
                            </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ChangePasswordDesktop;
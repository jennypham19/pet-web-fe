import { COLORS } from "@/constants/colors";
import { IUser } from "@/types/user";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/avatar-1.png";
import { getRenderLabel, getRoleLabel } from "@/utils/labelEntoVni";
import { Apartment, AssignmentInd, Badge, BadgeOutlined, CalendarToday, ContactMail, Edit, Email, Fingerprint, LocationOn, Lock, Map, Phone, Wc } from "@mui/icons-material";
import { ROLE } from "@/constants/roles";
import location from "@/assets/images/users/location.png"
import { useState } from "react";
import EditProfile from "@/views/Manage/Information/components/EditProfile";
import DateTime from "@/utils/DateTime";
import ChangePassword from "@/views/Manage/Information/components/ChangePassword";
import ChangePasswordMobile from "../Mobile/ChangePasswordMobile";
import ChangePasswordDesktop from "./ChangePasswordDesktop";

interface InformationDesktopProps{
    profile: IUser,
    md: boolean
}

const InformationDesktop = (props: InformationDesktopProps) => {
    const { profile, md } = props;

    const [openProfile, setOpenProfile] = useState<{open: boolean, type: string}>({open: false, type: ''});

    return(
        <Box>
            {!openProfile.open && (
                <>
                    <Typography 
                        variant="h5" 
                        fontWeight={600}
                        mb={3}
                    >
                        Hồ sơ người dùng
                    </Typography>            
                    <Grid container spacing={2}>
                        {/* Ảnh đại diện */}
                        <Grid size={{ md: 3.5 }}>
                            <Paper 
                                sx={{
                                    mb: 2,
                                    pb: 3, 
                                    display: 'flex', justifyContent: 'center', 
                                    alignItems: 'center', 
                                    borderTopRadius: `6px`,
                                    borderTop: `8px solid ${COLORS.PRIMARY}`,
                                    flexDirection: 'column',
                                    gap: 2
                                }}
                            >
                                <Box 
                                    mt={4}
                                    sx={{ 
                                        borderRadius: '50%', 
                                        border: `2px solid ${COLORS.PRIMARY}`,
                                        p: 0.5
                                    }}
                                >
                                    <Avatar
                                        src={profile.avatarUrl || avatar}
                                        sx={{ width: 150, height: 150, borderRadius: '50%' }}
                                    />
                                </Box>
                                <Stack direction='column' alignItems='center'>
                                    <Typography variant="h5" fontWeight={500}>{profile.name}</Typography>
                                    <Typography variant="subtitle1">{getRoleLabel(profile.role).toUpperCase()}</Typography>
                                </Stack>
                                <Button
                                    onClick={() => {
                                        setOpenProfile({open: true, type: 'edit'})
                                    }}
                                    sx={{
                                        borderRadius: 5, p: 1.5, width: 250 
                                    }}
                                    startIcon={<Edit/>}
                                >
                                    Chỉnh sửa hồ sơ
                                </Button>
                                <Button
                                    onClick={() => {
                                        setOpenProfile({open: true, type: 'password'})
                                    }}
                                    sx={{
                                        borderRadius: 5, p: 1.5, width: 250 
                                    }}
                                    startIcon={<Lock/>}
                                >
                                    Thay đổi mật khẩu
                                </Button>
                            </Paper>
                            <Paper
                                sx={{ 
                                    bgcolor: '#e9e9e9',
                                    p: 3
                                }}
                            >
                                <Typography fontWeight={500}>Trạng thái làm việc</Typography>
                                <Box mt={1} borderRadius={2} display='flex' flexDirection='row' gap={2} bgcolor='#fff' p={2}>
                                    <Apartment 
                                        sx={{
                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                                            width: 50, height: 50, borderRadius: '50%',
                                            bgcolor: COLORS.PRIMARY, color: '#fff', p: 1
                                        }}
                                    />
                                    <Stack direction='column'>
                                        <Typography>PHÒNG BAN</Typography>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {(profile.role === ROLE.ADMIN || profile.role === ROLE.MOD) 
                                                ? "Ban quản lý nhân sự" : "Ban quản lý và chăm sóc thú cưng"
                                            }
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Thông tin chi tiết */}
                        <Grid size={{ md: 8.5 }}>
                            <Grid container spacing={2}>
                                {/* Thông tin cơ bản */}
                                <Grid size={{ md: 12 }}>
                                    <Paper
                                        sx={{ borderRadius: 2, p: 4, bgcolor: '#fff'}}
                                    >
                                        <Stack>
                                            <Badge/>
                                            <Typography fontWeight={500}>Thông tin cơ bản</Typography>
                                        </Stack>
                                        <Grid sx={{ mt: 3 }} container spacing={2}>
                                            <Grid size={{ md: 6}}>
                                                <Stack direction='column'>
                                                    <Typography variant="caption">GIỚI TÍNH</Typography>
                                                    <Stack>
                                                        <Wc/>
                                                        <Typography variant="caption" fontWeight={600}>
                                                            {getRenderLabel(profile.gender)}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                            <Grid size={{ md: 6}}>
                                                <Stack direction='column'>
                                                    <Typography variant="caption">NGÀY SINH</Typography>
                                                    <Stack>
                                                        <CalendarToday/>
                                                        <Typography variant="caption" fontWeight={600}>
                                                            {DateTime.FormatDate(profile.dob)}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                            <Grid size={{ md: 6}}>
                                                <Stack direction='column'>
                                                    <Typography variant="caption">CCCD</Typography>
                                                    <Stack>
                                                        <Fingerprint/>
                                                        <Typography variant="caption" fontWeight={600}>
                                                            {profile.cccd}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                            <Grid size={{ md: 6}}>
                                                <Stack direction='column'>
                                                    <Typography variant="caption">VỊ TRÍ</Typography>
                                                    <Stack>
                                                        <AssignmentInd/>
                                                        <Typography variant="caption" fontWeight={600}>
                                                            {profile.position}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                            <Grid size={{ md: 6}}>
                                                <Stack direction='column'>
                                                    <Typography variant="caption">CHỨC VỤ</Typography>
                                                    <Stack>
                                                        <BadgeOutlined/>
                                                        <Typography variant="caption" fontWeight={600}>
                                                            {profile.title}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Paper>                            
                                </Grid>

                                {/* Liên lạc */}
                                <Grid size={{ md: 6 }}>
                                    <Paper
                                        sx={{ borderRadius: 2, p: 4, bgcolor: '#fff'}}
                                    >
                                        <Stack>
                                            <ContactMail/>
                                            <Typography fontWeight={500}>Liên lạc</Typography>
                                        </Stack>
                                        <Box mt={5} display='flex' flexDirection='row' gap={2}>
                                            <Email 
                                                sx={{
                                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                    width: 35, height: 35, borderRadius: 1,
                                                    bgcolor: "#e4e4e4", color: COLORS.PRIMARY, p: 0.6
                                                }}
                                            />
                                            <Stack direction='column'>
                                                <Typography variant="caption">EMAIL</Typography>
                                                <Typography variant="caption" fontWeight={600}>
                                                    {profile.email}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                        <Box mt={2} display='flex' flexDirection='row' gap={2}>
                                            <Phone 
                                                sx={{
                                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                    width: 35, height: 35, borderRadius: 1,
                                                    bgcolor: "#e4e4e4", color: COLORS.PRIMARY, p: 0.6
                                                }}
                                            />
                                            <Stack direction='column'>
                                                <Typography variant="caption">ĐIỆN THOẠI</Typography>
                                                <Typography variant="caption" fontWeight={600}>
                                                    {profile.phone}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Paper>                            
                                </Grid>

                                {/* Địa chỉ */}
                                <Grid size={{ md: 6 }}>
                                    <Paper
                                        sx={{ borderRadius: 2, p: 4, bgcolor: '#fff'}}
                                    >
                                        <Stack>
                                            <LocationOn/>
                                            <Typography fontWeight={500}>Địa chỉ</Typography>
                                        </Stack>
                                        <Box mt={5} display='flex' flexDirection='row' gap={2}>
                                            <Map 
                                                sx={{
                                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                    width: 35, height: 35, borderRadius: 1,
                                                    bgcolor: "#e4e4e4", color: COLORS.PRIMARY, p: 0.6
                                                }}
                                            />
                                            <Stack direction='column'>
                                                <Typography variant="caption">ĐỊA CHỈ</Typography>
                                                <Typography variant="caption" fontWeight={600}>
                                                    {profile.address}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                        <Box mt={3}
                                            sx={{
                                                borderTopRightRadius: 5, 
                                                borderTopLeftRadius: 5, 
                                                width: '100%', height: 120,
                                                objectFit: 'fill',
                                                backgroundImage: `url(${location})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        />
                                    </Paper>                            
                                </Grid>
                                <Grid size={{ md: 12 }}>
                                    <Paper
                                        sx={{ 
                                            bgcolor: '#e9e9e9',
                                            p: 3
                                        }}
                                    >
                                        <Typography mb={2} fontWeight={500}>Tiểu sử nghề nghiệp</Typography>
                                        <Typography variant="caption">{profile.professionalBiography}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>                
                </>
            )}
            {openProfile.open && openProfile.type === 'edit' && profile && (
                <EditProfile 
                    onClose={() => setOpenProfile({ open: false, type: 'edit' })} 
                    profile={profile}
                />
            )}
            {openProfile.open && openProfile.type === 'password' && (
                md ? (
                    <ChangePasswordMobile/>
                ) : (
                    <ChangePasswordDesktop
                        onClose={() => setOpenProfile({ open: false, type: 'password' })}
                        user={profile}
                    />
                )
            )}
        </Box>
    )
}
export default InformationDesktop;
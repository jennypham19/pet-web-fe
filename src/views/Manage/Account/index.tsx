import Page from "@/components/Page";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/avatar-1.png"
import { AccountBox, List } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { COLORS } from "@/constants/colors";
import AccountContent from "./components/MainContent/Account";

const DATA_SIDEBAR_EMP = [
    {
        id: 1,
        label: 'Tài khoản',
        value: 'account',
        icon: <AccountBox/>
    },
    {
        id: 2,
        label: 'Danh sách nhân sự',
        value: 'list',
        icon: <List/>
    },
]

const ManagementAccount = () => {
    const location = window.location.pathname;
    const [openSidebarEmp, setOpenSidebarEmp] = useState<{open: boolean, type: string}>({ open: false, type: '' });

    useEffect(() => {
        if(location.includes('account')) {
            setOpenSidebarEmp({ open: true, type: 'account'})
        }
    }, [location, setOpenSidebarEmp])

    const handleClick = (open: boolean, value: string) => {
        setOpenSidebarEmp({ open: open, type: value })
    }

    console.log("openSidebarEmp: ", openSidebarEmp);
    
    return(
        <Page title="Quản lý tài khoản">
            <Grid sx={{ m: 2 }} container spacing={2}>
                <Grid size={{ xs: 12, md: 3.5 }}>
                    <Paper elevation={2} sx={{ p: 2, boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.1)' }}>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Avatar
                                src={avatar}
                                sx={{ borderRadius: '50%', width: 150, height: 150 }}
                            />
                            <Box mt={3}>
                                {DATA_SIDEBAR_EMP.map((data, index) => (
                                    <Stack 
                                        onClick={() => handleClick(true, data.value)} 
                                        key={index} px={5} py={1} direction='row'
                                        mb={1} 
                                        sx={{ 
                                            bgcolor: openSidebarEmp.open && openSidebarEmp.type === data.value ? `${COLORS.PRIMARY}` : 'transparent',
                                            py: 1, px: 4, cursor: 'pointer', borderRadius: 6,
                                            color: openSidebarEmp.open && openSidebarEmp.type === data.value ? '#000' : 'inherit',
                                            '&:hover': { 
                                                bgcolor: openSidebarEmp.open && openSidebarEmp.type === data.value ? `${COLORS.PRIMARY}` : 'rgba(0,0,0,0.1)'
                                            }
                                        }} 
                                    >
                                        {data.icon}
                                        <Typography sx={{ fontWeight: openSidebarEmp.open && openSidebarEmp.type === data.value ? 500 : 'inherit' }}>{data.label}</Typography>
                                    </Stack>                                
                                ))}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 8.5 }}>
                    <Paper elevation={2} sx={{ boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.1)', p:2 }}>
                        {openSidebarEmp.open && openSidebarEmp.type === 'account' && (
                            <AccountContent/>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
}

export default ManagementAccount
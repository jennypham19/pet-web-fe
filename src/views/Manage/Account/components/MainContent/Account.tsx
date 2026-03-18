import { COLORS } from "@/constants/colors";
import CardData from "@/views/components/CardData";
import SearchBox from "@/views/Manage/components/SearchBox";
import { Add } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/avatar-1.png"
import { getRoleLabel } from "@/utils/labelEntoVni";
import { useState } from "react";
import DialogCreateAccount from "../DialogCreateAccount";

const DATA = [
    {
        id: 1,
        avartarUrl: avatar,
        name: 'Nguyễn Văn A',
        role: 'mod',
    },
    {
        id: 2,
        avartarUrl: avatar,
        name: 'Nguyễn Văn A',
        role: 'specialist',
    },
    {
        id: 1,
        avartarUrl: avatar,
        name: 'Nguyễn Văn A',
        role: 'employee',
    },
]

interface AccountContentProps{

}

const AccountContent = (props: AccountContentProps) => {
    const { } = props;
    const [openDialogCreateAccount, setOpenDialogCreateAccount] = useState(false);
    
    const handleOpenDialogCreateAccount = () => {
        setOpenDialogCreateAccount(true)
    }

    const handleCloseDialogCreateAccount = () => {
        setOpenDialogCreateAccount(false)
    }
    return(
        <Box>
            <SearchBox
                initialValue=''
                onSearch={() => {}}
            >
                <Button
                    onClick={handleOpenDialogCreateAccount}
                    variant="contained"
                    sx={{ bgcolor: COLORS.PRIMARY, borderRadius: 2, px: 1.5, py: 1, fontWeight: 500 }}
                    endIcon={<Add/>}
                >
                    Tạo tài khoản
                </Button>
            </SearchBox>
            <Typography mt={1.5} variant="h6" fontWeight={500}>
                Danh sách tài khoản
            </Typography>
            <Grid container spacing={2}>
                {DATA.map((data, idx) => (
                    <Grid key={idx} size={{ xs: 12, md: 4 }}>
                        <CardData>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <Avatar
                                    src={data.avartarUrl}
                                    sx={{ borderRadius: '50%', width: 100, height: 100 }}
                                />
                                <Box mt={2}>
                                    <Stack>
                                        <Typography variant="subtitle2">Tên: </Typography>
                                        <Typography variant="subtitle2" fontWeight={500}>{data.name} </Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography variant="subtitle2">Chức vụ: </Typography>
                                        <Typography variant="subtitle2" fontWeight={500}>{getRoleLabel(data.role)} </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </CardData>
                    </Grid>
                ))}
            </Grid>
            {openDialogCreateAccount && (
                <DialogCreateAccount
                    open={openDialogCreateAccount}
                    onClose={handleCloseDialogCreateAccount}
                />
            )}
        </Box>
    )
}

export default AccountContent
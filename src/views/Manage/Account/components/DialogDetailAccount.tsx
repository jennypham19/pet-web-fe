import DialogComponent from "@/components/DialogComponent";
import { getDetailAccount } from "@/services/user-service";
import { IUser } from "@/types/user";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import avatar from "@/assets/images/users/avatar-1.png"
import { getRoleLabel } from "@/utils/labelEntoVni";

interface DialogDetailAccountProps{
    id: string,
    open: boolean,
    onClose: () => void;
}

const DialogDetailAccount = (props: DialogDetailAccountProps) => {
    const { id, open, onClose } = props;
    const [account, setAccount] = useState<IUser | null>(null);
    
    useEffect(() => {
        if(open && id){
            const getAccount = async() => {
                const res = await getDetailAccount(id);
                const data = res.data as any as IUser;
                setAccount(data)
            };

            getAccount();
        }
    }, [open, id])
    return(
        <DialogComponent
            handleClose={onClose}
            dialogKey={open}
            isActiveFooter={false}
            dialogTitle="Chi tiết tài khoản"
            maxWidth={'xs'}
        >
            {account && (
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Avatar
                        src={account.avatarUrl || avatar}
                        sx={{ borderRadius: '50%', width: 100, height: 100 }}
                    />
                    <Box mt={2}>
                        <Stack>
                            <Typography variant="subtitle2">Tên: </Typography>
                            <Typography variant="subtitle2" fontWeight={500}>{account.name} </Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="subtitle2">Tài khoản: </Typography>
                            <Typography variant="subtitle2" fontWeight={500}>{account.account} </Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="subtitle2">Chức vụ: </Typography>
                            <Typography variant="subtitle2" fontWeight={500}>{getRoleLabel(account.role)} </Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="subtitle2">Số điện thoại: </Typography>
                            <Typography variant="subtitle2" fontWeight={500}>{account.phone || ''} </Typography>
                        </Stack>
                    </Box>
                </Box>
            )}
            
        </DialogComponent>
    )
}

export default DialogDetailAccount;
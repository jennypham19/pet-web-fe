import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";
import { COLORS } from "@/constants/colors";
import { Box, Button, Typography } from "@mui/material";

interface DialogConfirmProps{
    open: boolean,
    onClose: () => void,
    title: string,
    image: string,
    label: string
}

const DialogConfirm = (props: DialogConfirmProps) => {
    const { open, onClose, title, image, label } = props;
    return (
        <DialogComponent
            handleClose={onClose}
            dialogKey={open}
            isActiveFooter={false}
            isCenter={false}
        >
            <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                <Typography variant="h6" fontWeight={600}>{title}</Typography>
                <CommonImage
                    src={image}
                    alt="img"
                    sx={{ width: 150, height: 150, my: 2 }}
                />
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{ px: 2, borderRadius: 2, border:`1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY }}
                >
                    {label}
                </Button>
            </Box>
        </DialogComponent>
    )
}

export default DialogConfirm;
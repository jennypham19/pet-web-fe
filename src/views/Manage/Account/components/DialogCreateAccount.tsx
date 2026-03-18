import DialogComponent from "@/components/DialogComponent";
import Grid from "@mui/material/Grid2"

interface DialogCreateAccountProps{
    open: boolean,
    onClose: () => void;
}

const DialogCreateAccount = (props: DialogCreateAccountProps) => {
    const { open, onClose } = props;
    const handleClose = () => {
        onClose()
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            dialogTitle="Tạo tài khoản"
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}></Grid>
                <Grid size={{ xs: 12, md: 4 }}></Grid>
                <Grid size={{ xs: 12, md: 4 }}></Grid>
            </Grid>
        </DialogComponent>
    )
};

export default DialogCreateAccount;
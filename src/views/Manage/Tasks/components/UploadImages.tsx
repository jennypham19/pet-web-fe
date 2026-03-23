import DialogComponent from "@/components/DialogComponent";
import { Box } from "@mui/material";

interface UploadImagesProps{
    open: boolean,
    onClose: () => void;
}

const UploadImages = (props: UploadImagesProps) => {
    const { open, onClose } = props;

    const handleClose = () => {
        onClose();
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            isActiveHeader={false}
        >
            <Box></Box>
        </DialogComponent>
    )
}

export default UploadImages;
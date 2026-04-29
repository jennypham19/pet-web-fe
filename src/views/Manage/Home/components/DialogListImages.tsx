import DialogComponent from "@/components/DialogComponent";
import { getListImagesByDate, ImagesTask } from "@/services/task-service";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import DateTime from "@/utils/DateTime";
import { Typography } from "@mui/material";
import CommonImage from "@/components/Image/index";

interface DialogListImagesProps{
    open: boolean;
    onClose: () => void;
    date: any
}

const DialogListImages = (props: DialogListImagesProps) => {
    const { open, onClose, date } = props;
    const [images, setImages] = useState<ImagesTask | null>(null);
    const getImages = async() => {
        const res = await getListImagesByDate({ date: date });
        const data = res.data as any as ImagesTask;
        setImages(data);
    }

    useEffect(() => {
        if(open){
            getImages()
        }
    }, [open])
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveFooter={false}
            dialogTitle={`Hình ảnh ngày ${DateTime.FormatDate(date)}`}
            toolTip={`Hình ảnh ngày ${DateTime.FormatDate(date)}`}
        >
            <Grid container spacing={2}>
                {images?.images.length === 0 ? (
                    <Typography>Không tồn tại hình ảnh nào.</Typography>
                ) : (
                    images?.images.map((image, index) => (
                        <Grid key={index} size={{ xs: 12, md: 6 }}>
                            <CommonImage
                                src={image.urlImage}
                                alt={image.nameImage}
                                borderRadius={2}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </DialogComponent>
    )
}

export default DialogListImages;
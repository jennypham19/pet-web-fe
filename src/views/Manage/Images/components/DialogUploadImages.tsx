import Backdrop from "@/components/Backdrop";
import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import { COLORS } from "@/constants/colors";
import { getPets } from "@/services/pet-service";
import { IPet } from "@/types/pet";
import { getPhotoTime, resizeImage } from "@/utils/common";
import DateTime from "@/utils/DateTime";
import { CameraAlt, Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRef, useState } from "react";
import AutocompleteComponent from "../../Tasks/components/AutocompleteComponent";

interface DialogUploadImagesProps {
    open: boolean;
    onClose: () => void;
}

const DialogUploadImages = (props: DialogUploadImagesProps) => {
    const { open, onClose } = props;

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        onClose();
        setImageFiles([]);
        setImages([])
    }

    const handleChangeImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const resized = await Promise.all(
            Array.from(files).map(async (file) => {
                return resizeImage(file, 800)
            })
        );
        const resizedFiles = resized.map((r) => new File([r.blob], r.name!, { type: "image/*" }));
        setImageFiles((prev) => [...prev, ...resizedFiles]);
        const urls = resized.map((file) => file.previewUrl);
        setImages((prev) => ([...prev, ...urls]));

        // reset input để có thể chọn lại cùng 1 file
        event.target.value = '';
    };

    const handleRemoveImages = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleBoxClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        try {

        } catch (error) {
            
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            dialogTitle="Thêm hình ảnh"
            labelBtn="Hủy"
            isIcon={false}
            customButtons={
                <Button sx={{ bgcolor: COLORS.PRIMARY }} onClick={handleSave} disabled={imageFiles.length === 0}>
                    Lưu
                </Button>
            }
        >
        <Grid container spacing={2}>
          {images.length > 0 &&
            images.map((img, idx) => (
              <Grid key={idx} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={img}
                    alt={`upload-${idx}`}
                    style={{ width: '100%', height: 200, objectFit: 'fill' }}
                  />
                  <IconButton
                    onClick={() => handleRemoveImages(idx)}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      color: '#000',
                      '&:hover': { bgcolor: 'transparent' },
                    }}
                    size='small'
                  >
                    <Close fontSize='small' />
                  </IconButton>
                </Box>
                <Box>
                    <AutocompleteComponent<IPet>
                        placeholder="Thú cưng *"
                        fetchOptions={getPets}
                        getOptionLabel={(option) => option.name}
                        getOptionKey={(option) => option.id}
                        onChange={(value) => {
                            // setFormDataTask(prev => ({ ...prev, 'pets': value }))
                            // setErrorsTask(prev => ({ ...prev, 'pets': undefined }))   
                        }}
                        getRenderOption={(option) => (
                            <>
                            <img
                                alt={option.nameAvatar}
                                loading="lazy"
                                width="20" height={20}
                                src={option.urlAvatar}
                            />
                            <Typography variant="subtitle2">{option.name}</Typography>
                            </>
                        )}
                    />
                </Box>
              </Grid>
            ))}
            <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                    <input
                        type='file'
                        accept='image/*'
                        capture='environment'
                        hidden
                        ref={fileInputRef}
                        onChange={handleChangeImages}
                        multiple
                    />
                    <Box
                        onClick={handleBoxClick}
                        sx={{
                            border: '2px dashed #000',
                            borderRadius: 2,
                            p: 3,
                            textAlign: 'center',
                            '&:hover': { borderColor: 'primary.main' },
                            height: 180,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <Box sx={{ margin: 'auto 0' }}>
                            <CameraAlt sx={{ fontSize: 48, color: 'text.secondary' }} />
                            <Typography fontSize='13px'>Thêm HÌNH ẢNH trực tiếp tại đây.</Typography>
                            <Typography fontSize='13px'>{`Hình ảnh dưới dạng PNG, JPG....`}</Typography>
                        </Box>
                    </Box>
                </Box>            
            </Grid>
        </Grid>
        {isSubmitting && <Backdrop open={isSubmitting}/>}
        </DialogComponent>
    )
}

export default DialogUploadImages;
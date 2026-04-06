import Backdrop from "@/components/Backdrop";
import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import { COLORS } from "@/constants/colors";
import { addPetImages, getPets } from "@/services/pet-service";
import { IPet } from "@/types/pet";
import { getPhotoTime, resizeImage } from "@/utils/common";
import DateTime from "@/utils/DateTime";
import { CameraAlt, Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRef, useState } from "react";
import AutocompleteComponent from "./AutocompleteComponent";
import { uploadImages } from "@/services/upload-service";
import useNotification from "@/hooks/useNotification";

type ImageItem = {
  file: File;
  preview: string;
  petId?: string;
};

interface DialogUploadImagesProps {
    open: boolean;
    onClose: () => void;
}

const DialogUploadImages = (props: DialogUploadImagesProps) => {
    const { open, onClose } = props;
    const notify = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<{ images?: string}>({});
    const [imageItems, setImageItems] = useState<ImageItem[]>([]);

    const handleClose = () => {
        onClose();
        setImageItems([]);
    }

    const handleChangeImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const resized = await Promise.all(
            Array.from(files).map(async (file) => {
                return resizeImage(file, 800)
            })
        );
        const newItems: ImageItem[] = resized.map((r) => ({
            file: new File([r.blob], r.name!, { type: "image/*" }),
            preview: r.previewUrl,
            petId: undefined
        }));
        setImageItems((prev) => [...prev, ...newItems]);

        // reset input để có thể chọn lại cùng 1 file
        event.target.value = '';
    };

    const handleRemoveImages = (index: number) => {
        setImageItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleBoxClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const validate = () : boolean => {
        const newError: { images?: string} = {};
        if (imageItems.length === 0) {
            newError.images = 'Vui lòng chọn ít nhất 1 hình ảnh';
        }
        const hasMissingPetId = imageItems.some(item => !item.petId);
        if(hasMissingPetId){
            newError.images = 'Mỗi ảnh phải chọn thú cưng';
        }
        setError(newError);
        return Object.keys(newError).length === 0;

    }

    const handleSave = async () => {
        if(!validate()) return;
        setIsSubmitting(true);
        try {
            const files = imageItems.map((i) => i.file);
            let uploadResponses: any;
            uploadResponses = await uploadImages(files, 'pets/images');
            if(!uploadResponses.success || !uploadResponses.data.files){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh'); 
            }

            const payloads: { imagePets: { petId: string, nameImage: string, urlImage: string } []} = {
                imagePets: uploadResponses.data.files.map((file: any, index: number) => ({
                    petId: imageItems[index].petId!,
                    nameImage: file.originalname,
                    urlImage: file.url
                }))   
            }
            const res = await addPetImages(payloads);
            notify({ message: res.message, severity: 'success' })
            handleClose();
        } catch (error: any) {
            notify({ message: error.message, severity: 'error' })
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
                <Button sx={{ bgcolor: COLORS.PRIMARY }} onClick={handleSave} disabled={imageItems.length === 0}>
                    Lưu
                </Button>
            }
        >
        <Grid container spacing={2}>
            {imageItems.map((img, idx) => (
              <Grid key={idx} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={img.preview}
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
                            setImageItems((prev) => prev.map((item, i) => i === idx ? { ...item, petId: value?.id } : item)); 
                            setError((prev) => ({ ...prev, images: undefined }));
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
                        error={!!error.images}
                        helperText={error.images}
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
import { ChangeEvent, useRef, useState } from "react";



import { CameraAlt, Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DialogComponent from "@/components/DialogComponent";



import { COLORS } from "@/constants/colors";
import { getPhotoTime, resizeImage } from "@/utils/common";


interface UploadImagesProps{
    open: boolean,
    onClose: () => void;
}

const UploadImages = (props: UploadImagesProps) => {
    const { open, onClose } = props;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [errorFiles, setErrorFiles] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagesUrl, setImagesUrl] = useState<string[]>([]);


    const handleChangeImages = async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      console.log("files: ", files);
      
      if (!files) return;
      const resized = await Promise.all(
        Array.from(files).map(async (file) => {
        const takenAt = await getPhotoTime(file);
        const resized = await resizeImage(file, 800);
        //   return resizeImage(file, 800);
        return {
            file: new File([resized.blob], file.name, { type: file.type }),
            previewUrl: resized.previewUrl,
            takenAt,
        };        
        }),
      );

      console.log('resized: ', resized);

      const resizedFiles = resized.map((r) => r.file);
      setImageFiles((prev) => [...prev, ...resizedFiles]);
      const urls = resized.map((file) => file.previewUrl);
      setImagesUrl((prev) => [...prev, ...urls]);
      setErrorFiles('');
      // reset input để có thể chọn lại cùng 1 file
      event.target.value = '';
    };

    const handleRemove = (index: number) => {
      setImagesUrl((prev) => prev.filter((_, i) => i !== index));
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    }
    const handleClose = () => {
        onClose();
    }
    return (
      <DialogComponent
        dialogKey={open}
        handleClose={handleClose}
        isActiveFooter={false}
        isActiveHeader={false}
      >
        <Grid container spacing={2}>
          {imagesUrl.length > 0 &&
            imagesUrl.map((img, idx) => (
              <Grid size={{ xs: 6 }}>
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
                    onClick={() => handleRemove(idx)}
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
              </Grid>
            ))}
        <Grid size={{ xs: 6 }}>
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
                sx={{
                border: errorFiles ? '2px dashed red' : '2px dashed #000',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                '&:hover': { borderColor: 'primary.main' },
                height: 180,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <Box sx={{ margin: 'auto 0' }}>
                <CameraAlt sx={{ fontSize: 48, color: 'text.secondary' }} />
                <Typography fontSize='14px'>Thêm HÌNH ẢNH cập nhật công việc tại đây.</Typography>
                <Typography fontSize='14px'>{`Hình ảnh dưới dạng PNG, JPG....`}</Typography>
                </Box>
            </Box>
            <Box mt={2} display='flex' justifyContent='center'>
                <Button
                    onClick={handleBoxClick}
                    variant='outlined'
                    sx={{
                        border: `1px solid ${COLORS.PRIMARY}`,
                        color: COLORS.PRIMARY,
                        px: 2,
                        borderRadius: 2,
                    }}
                >
                Thêm hình ảnh
                </Button>
            </Box>
            </Box>            
        </Grid>
        </Grid>
      </DialogComponent>
    );
}

export default UploadImages;
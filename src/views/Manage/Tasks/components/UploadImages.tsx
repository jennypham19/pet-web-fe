import { ChangeEvent, useRef, useState } from "react";
import { CameraAlt, Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DialogComponent from "@/components/DialogComponent";
import { COLORS } from "@/constants/colors";
import { getPhotoTime, resizeImage } from "@/utils/common";
import DateTime from "@/utils/DateTime";
import useNotification from "@/hooks/useNotification";
import { uploadImages } from "@/services/upload-service";
import { PayloadTaskImages } from "@/types/task";
import useAuth from "@/hooks/useAuth";
import { updateImagesForTask } from "@/services/task-service";
import Backdrop from "@/components/Backdrop";


interface UploadImagesProps{
    open: boolean,
    onClose: () => void;
    id: string
}

const UploadImages = (props: UploadImagesProps) => {
    const { open, onClose, id } = props;
    const notify = useNotification();
    const { profile } = useAuth()
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [errorFiles, setErrorFiles] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [images, setImages] = useState<{url: string, time: Date | null}[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChangeImages = async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
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
      const resizedFiles = resized.map((r) => r.file);
      setImageFiles((prev) => [...prev, ...resizedFiles]);
      const urls = resized.map((file) => ({
        url: file.previewUrl,
        time: file.takenAt ? file.takenAt : null
      }));
      setImages((prev) => ([...prev, ...urls]));

      setErrorFiles('');
      // reset input để có thể chọn lại cùng 1 file
      event.target.value = '';
    };

    const handleRemove = (index: number) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    }
    const handleClose = () => {
        onClose();
    }

    const handleSave = async() => {
      setIsSubmitting(true);
      try {
        let uploadResponses: any;
        uploadResponses = await uploadImages(imageFiles!, 'tasks/images');
        if(!uploadResponses.success || !uploadResponses.data.files){
          throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh'); 
        }

        const payloadImages = uploadResponses.data.files.map((img: any, index: number) => ({
          nameImage: img.originalname,
          urlImage: img.url,
          uploadedDate: images[index]?.time || null
        }))

        const payload: PayloadTaskImages = {
          uploadedBy: profile?.id ? profile.id : undefined,
          images: payloadImages
        }
        console.log("payload: ", payload);
        
        const res = await updateImagesForTask(id, payload);
        notify({
          message: res.message,
          severity: 'success'
        })
        handleClose()
      } catch (error: any) {
        notify({
          message: error.message,
          severity: 'error'
        })
      } finally {
        setIsSubmitting(false)
      }
    }

    return (
      <DialogComponent
        dialogKey={open}
        handleClose={handleClose}
        isActiveFooter={false}
        isActiveHeader={false}
      >
        <Grid container spacing={2}>
          {images.length > 0 &&
            images.map((img, idx) => (
              <Grid size={{ xs: 6 }}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={img.url}
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
                <Typography mt={1.5} variant="caption">{DateTime.Format(img.time)}</Typography>
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
                  <Typography fontSize='13px'>Thêm HÌNH ẢNH cập nhật công việc tại đây.</Typography>
                  <Typography fontSize='13px'>{`Hình ảnh dưới dạng PNG, JPG....`}</Typography>
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
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleSave}
              sx={{ bgcolor: COLORS.PRIMARY, px: 2 }}
              disabled={imageFiles.length === 0}
            >
              Cập nhật
            </Button>
          </Grid>
        </Grid>
        {isSubmitting && <Backdrop open={isSubmitting}/>}
      </DialogComponent>
    );
}

export default UploadImages;
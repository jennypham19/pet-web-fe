import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavigateBack from "@/views/components/NavigateBack";
import image_pet from "@/assets/images/users/image-pet.jpg"
import CommonImage from "@/components/Image/index";

interface CreateProfilePetProps{
    onClose: () => void;
}

const CreateProfilePet = (props: CreateProfilePetProps) => {
    const { onClose } = props;
    const handleClose = () => {
        onClose()
    }
    return (
      <Box>
        <NavigateBack sx={{ p: 1, bgcolor: '#fff' }} title='Tạo hồ sơ' onBack={handleClose} />
        <Grid container spacing={2} sx={{ m: 1 }}>
          <Grid size={{ xs: 12, md: 8.5 }}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={600}>Tạo hồ sơ thú cưng</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight={500}>Hình ảnh cập nhật thú cưng</Typography>
                <Box flexDirection='column' mt={5} display='flex' justifyContent='center' alignItems='center'>
                    <CommonImage
                        src={image_pet}
                        sx={{ width: '50%', height: '50%', mb: 4 }}
                    />
                    <Typography align="center" variant="h6" sx={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>Bạn chưa có hình ảnh cập nhật của thú cưng</Typography>
                </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
}

export default CreateProfilePet;
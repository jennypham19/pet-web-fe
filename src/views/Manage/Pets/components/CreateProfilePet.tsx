import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavigateBack from "@/views/components/NavigateBack";
import image_pet from "@/assets/images/users/image-pet.jpg"
import CommonImage from "@/components/Image/index";
import { useRef } from "react";
import { PhotoCamera } from "@mui/icons-material";
import PetInformation from "./InformationDetails/PetInformation";
import PetHealthInformation from "./InformationDetails/PetHealthInformation";
import Vaccination from "./InformationDetails/Vaccination";
import Deworming from "./InformationDetails/Deworming";
import RegularVetCheckup from "./InformationDetails/RegularVetCheckup";
import SpecialNutritionalPlan from "./InformationDetails/SpecialNutritionalPlan";
import { COLORS } from "@/constants/colors";

interface CreateProfilePetProps{
    onClose: () => void;
}

const CreateProfilePet = (props: CreateProfilePetProps) => {
    const { onClose } = props;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
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
                <Grid container spacing={1}>
                    {/* --------- Ảnh thú cưng ----------- */}
                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}>
                      <Box sx={{ position: 'relative', width: 150, height: 150 }}>
                        <Avatar
                          src={''}
                          sx={{ width: '100%', height: '100%', mb: 2, bgcolor: 'grey.500', borderRadius: '50%'}}
                        />
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: 'grey.300',
                            borderRadius: '50%',
                            minWidth: '30px',
                            width: '30px',
                            height: '30px',
                            position: 'absolute',
                            bottom: 0,
                            right: 5
                          }}
                          component='label'
                          startIcon={<PhotoCamera sx={{ width: '25px', height: '25px', ml: 1.2, color: '#1C1A1B'}}/>}
                        >
                          <input ref={fileInputRef} type="file" hidden accept="iamge/*" onChange={() => {}}/>
                        </Button>
                      </Box>
                    </Grid>

                    {/* --------- Thông tin thú cưng ----------- */}
                    <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                      <PetInformation
                        onInputChange={() => {}}
                      />
                    </Grid>

                    {/* --------- Thông tin y tế thú cưng ----------- */}
                    <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                      <PetHealthInformation
                        onInputChange={() => {}}
                      />
                    </Grid>

                    {/* --------- Tiêm phòng ----------- */}
                    <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                      <Vaccination
                        onInputChange={() => {}}
                      />
                    </Grid>

                    {/* --------- Tẩy giun ----------- */}
                    <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                      <Deworming
                        onInputChange={() => {}}
                      />
                    </Grid>

                    {/* --------- Khám định kỳ thú cưng ----------- */}
                    <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                      <RegularVetCheckup
                        onInputChange={() => {}}
                      />
                    </Grid>

                    {/* --------- Chế độ dinh dưỡng đặc biệt ----------- */}
                    <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                      <SpecialNutritionalPlan
                        onInputChange={() => {}}
                      />
                    </Grid>

                    {/* ----------- Nút ------------- */}
                    <Grid size={{ xs: 12 }} sx={{ mt: 2.5, gap: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        sx={{ bgcolor: COLORS.PRIMARY, width: 120, borderRadius: 2 }}
                      >
                        Tạo hồ sơ
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY, width: 120, borderRadius: 2 }}
                      >
                        Hủy
                      </Button>
                    </Grid>
                </Grid>
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
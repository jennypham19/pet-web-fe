import CommonImage from "@/components/Image/index";
import { COLORS } from "@/constants/colors";
import { IPet } from "@/types/pet";
import DateTime from "@/utils/DateTime";
import { MedicalServices } from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface ViewPetDesktopProps{
    pet: IPet
}

const ViewPetDesktop = (props: ViewPetDesktopProps) => {
    const { pet } = props;
    return(
        <Box p={2}>
            <Grid container spacing={2}>
                {/* Thông tin thú cưng */}
                <Grid size={{ md: 4 }}>
                    <Paper sx={{ pb: 1 }}>
                        <Box
                            sx={{ 
                                position: 'relative', 
                                borderTopRightRadius: 5, 
                                borderTopLeftRadius: 5, 
                                width: '100%', height: 300,
                                objectFit: 'cover',
                                backgroundImage: `url(${pet.urlAvatar})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <Box
                                sx={{ position: 'absolute' }}
                                bottom={0}
                                left={0}
                            >
                                <Typography 
                                    variant="h4" 
                                    fontWeight={600} 
                                    px={2} 
                                    sx={{
                                       color:"#fff",
                                       textShadow:"0 0 5px rgba(0,0,0,0.5)"  
                                    }}
                                    
                                >
                                    {pet.name}
                                </Typography>
                                <Stack px={2} gap={1} pb={2}>
                                    <Chip label={pet.species.toLocaleUpperCase()} sx={{ bgcolor: "#0081BB", color: '#fff', px: 1 }}></Chip>
                                    <Chip label={pet.sex.toLocaleUpperCase()} sx={{ bgcolor: "#0081BB", color: '#fff', px: 1 }}></Chip>
                                </Stack>
                            </Box>
                        </Box>  
                        <Box m={4} display='flex' justifyContent='space-between'>
                            <Stack direction='column'>
                                <Typography variant="subtitle2" fontWeight={500}>NGÀY SINH</Typography>
                                <Typography variant="subtitle2">{DateTime.FormatDate(pet.dob)}</Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2">{pet.breedingStatus}</Typography>
                            </Stack>
                        </Box>
                    </Paper>
                    <Typography mt={3} variant="h6" fontWeight={600}>Hình ảnh của {pet.name}</Typography>
                    <Grid container spacing={2} mt={1}>
                        {pet.petImages.length > 0  && pet.petImages.map((img, idx) => (
                            <Grid key={idx} size={{ md: 6 }}>
                                <CommonImage
                                    src={img.urlImage}
                                    alt={img.nameImage}
                                    sx={{ height: 250, width: '100%' }}
                                />
                            </Grid>
                        ))}
                    </Grid>  
                </Grid>

                {/*  Thông tin y tế, tiêm phòng, tẩy giun, khám định kỳ, chế độ dinh dưỡng đặc biệt */}
                <Grid size={{ md: 8 }}>
                    <Paper sx={{ p: 2 }}>
                        <Stack>
                            <MedicalServices sx={{ color: COLORS.PRIMARY }}/>
                            <Typography variant="body1" fontWeight={500}>Thông tin y tế thú cưng</Typography>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ViewPetDesktop;
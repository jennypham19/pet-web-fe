import CommonImage from "@/components/Image/index";
import { COLORS } from "@/constants/colors";
import { IPet } from "@/types/pet";
import DateTime from "@/utils/DateTime";
import { getFrequencyPetLabel } from "@/utils/labelEntoVni";
import { ArrowForward, Edit, HealthAndSafety, MedicalServices, PestControl, RestaurantMenu, Vaccines } from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
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
                    {/* ------------ THÔNG TIN Y TẾ ------------- */}
                    <Paper sx={{ p: 2, bgcolor: '#dbd8d8' }}>
                        <Stack mb={2.5}>
                            <MedicalServices sx={{ color: COLORS.PRIMARY }}/>
                            <Typography variant="body1" fontWeight={500}>Thông tin y tế thú cưng</Typography>
                        </Stack>
                        <Grid container spacing={2}>
                            <Grid size={{ md: 6 }}>
                                <Typography fontWeight={600} variant="subtitle2">TÊN PHÒNG KHÁM</Typography>
                                <Typography mt={1} variant="subtitle2">{pet.petHealth?.clinicName}</Typography>
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <Typography fontWeight={600} variant="subtitle2">SỐ ĐIỆN THOẠI</Typography>
                                <Typography mt={1} variant="subtitle2">{pet.petHealth?.phone}</Typography>
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <Typography fontWeight={600} variant="subtitle2">BÁC SĨ THÚ Y</Typography>
                                <Typography mt={1} variant="subtitle2">{pet.petHealth?.attendingVet}</Typography>
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <Typography fontWeight={600} variant="subtitle2">ĐỊA CHỈ PHÒNG KHÁM</Typography>
                                <Typography mt={1} variant="subtitle2">{pet.petHealth?.address}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* ------------ TIÊM PHÒNG ------------- */}
                    <Paper sx={{ p: 2, my: 2 }}>
                        <Box display='flex' justifyContent='space-between'>
                            <Stack direction='row' gap={1}>
                                <Vaccines/>
                                <Typography fontWeight={600}>Thông tin tiêm vắc xin</Typography>
                            </Stack>
                            <Stack onClick={() => {}} sx={{ cursor: 'pointer', fontStyle: 'italic' }} direction='row'>
                                <Typography fontWeight={600} variant="caption">Xem thêm</Typography>
                                <ArrowForward sx={{ width: 15, height: 15 }}/>
                            </Stack>
                        </Box>
                        <Stepper sx={{ mt: 1.5 }} orientation="vertical">
                            {pet.petVaccination.slice(0,3).map((vacStep, index) => (
                                <Step key={vacStep.id}>
                                    <StepLabel
                                        icon={<Vaccines/>}
                                    >
                                        {index + 1}. {vacStep.medicationName}
                                    </StepLabel>
                                    <StepContent>
                                            <Box display='flex' flexDirection='column'>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Ngày bắt đầu tiêm: </Typography>
                                                    <Typography variant="caption">{DateTime.FormatDate(vacStep.firstDoseDate)}</Typography>
                                                </Stack>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Ngày tiêm nhắc lại: </Typography>
                                                    <Typography variant="caption">{DateTime.FormatDate(vacStep.boosterDate)}</Typography>
                                                </Stack>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Kết quả phản ứng: </Typography>
                                                    <Typography variant="caption">{vacStep.adverseReaction}</Typography>
                                                </Stack>
                                            </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>

                    {/* ------------ TẨY GIUN ------------- */}
                    <Paper sx={{ p: 2 }}>
                        <Box display='flex' justifyContent='space-between'>
                            <Stack direction='row' gap={1}>
                                <PestControl/>
                                <Typography fontWeight={600}>Thông tin tẩy giun</Typography>
                            </Stack>
                            <Stack onClick={() => {}} sx={{ cursor: 'pointer', fontStyle: 'italic' }} direction='row'>
                                <Typography fontWeight={600} variant="caption">Xem thêm</Typography>
                                <ArrowForward sx={{ width: 15, height: 15 }}/>
                            </Stack>
                        </Box>
                        <Stepper sx={{ mt: 1.5 }} orientation="vertical">
                            {pet.petDeworming.slice(0,3).map((vacDew, index) => (
                                <Step key={vacDew.id}>
                                    <StepLabel icon={<PestControl/>}>
                                        {index + 1}. {vacDew.medicationName}
                                    </StepLabel>
                                    <StepContent>
                                            <Box display='flex' flexDirection='column'>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Liều lượng: </Typography>
                                                    <Typography variant="caption">{vacDew.dosage}</Typography>
                                                </Stack>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Ngày tẩy giun: </Typography>
                                                    <Typography variant="caption">{DateTime.FormatDate(vacDew.dewormingDate)}</Typography>
                                                </Stack>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Ngày tẩy lại: </Typography>
                                                    <Typography variant="caption">{DateTime.FormatDate(vacDew.nextDewormingDate)}</Typography>
                                                </Stack>
                                            </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>

                    {/* ------------ KHÁM ĐỊNH KỲ ------------- */}
                    <Paper sx={{ p: 2, my: 2 }}>
                        <Box display='flex' justifyContent='space-between'>
                            <Stack direction='row' gap={1}>
                                <HealthAndSafety/>
                                <Typography fontWeight={600}>Thông tin khám định kỳ</Typography>
                            </Stack>
                            <Stack onClick={() => {}} sx={{ cursor: 'pointer', fontStyle: 'italic' }} direction='row'>
                                <Typography fontWeight={600} variant="caption">Xem thêm</Typography>
                                <ArrowForward sx={{ width: 15, height: 15 }}/>
                            </Stack>
                        </Box>
                        <Stepper sx={{ mt: 1.5 }} orientation="vertical">
                            {pet.petRegularVetCheckup.slice(0,3).map((checkUpStep, index) => (
                                <Step key={checkUpStep.id}>
                                    <StepLabel icon={<HealthAndSafety/>}>
                                        {index + 1}. Khám định kỳ lần {index + 1}
                                    </StepLabel>
                                    <StepContent>
                                            <Box display='flex' flexDirection='column'>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Ngày khám </Typography>
                                                    <Typography variant="caption">{DateTime.FormatDate(checkUpStep.examinationDate)}</Typography>
                                                </Stack>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Ngày khám lại: </Typography>
                                                    <Typography variant="caption">{DateTime.FormatDate(checkUpStep.recheckDate)}</Typography>
                                                </Stack>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Tình trạng sức khỏe: </Typography>
                                                    <Typography variant="caption">{checkUpStep.healthCondition}</Typography>
                                                </Stack>
                                                <Stack direction='row'>
                                                    <Typography fontWeight={500} variant="caption">Lết luận: </Typography>
                                                    <Typography variant="caption">{checkUpStep.conclusion}</Typography>
                                                </Stack>
                                            </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>

                    {/* ------------ CHẾ ĐỘ DINH DƯỠNG ĐẶC BIỆT ------------- */}
                    <Paper sx={{ p: 2 }}>
                        <Box mb={2.5} display='flex' justifyContent='space-between'>
                            <Stack direction='row' gap={1}>
                                <RestaurantMenu/>
                                <Typography fontWeight={600}>Thông tin chế độ dinh dưỡng đặc biệt</Typography>
                            </Stack>
                            <Stack onClick={() => {}} sx={{ cursor: 'pointer', fontStyle: 'italic' }} direction='row'>
                                <Typography fontWeight={600} variant="caption">Chỉnh sửa</Typography>
                                <Edit sx={{ width: 15, height: 15 }}/>
                            </Stack>
                        </Box>
                        {pet.petSpecialNutritionalPlan !== null && (
                            <Grid container spacing={2}>
                                <Grid size={{ md: 6 }}>
                                    <Typography fontWeight={600} variant="subtitle2">THỨC ĂN</Typography>
                                    <Typography mt={1} variant="subtitle2">{pet.petSpecialNutritionalPlan.food}</Typography>
                                </Grid>
                                <Grid size={{ md: 6 }}>
                                    <Typography fontWeight={600} variant="subtitle2">SỐ LƯỢNG</Typography>
                                    <Typography mt={1} variant="subtitle2">{pet.petSpecialNutritionalPlan.amount}</Typography>
                                </Grid>
                                <Grid size={{ md: 6 }}>
                                    <Typography fontWeight={600} variant="subtitle2">TẦN SUẤT</Typography>
                                    <Typography mt={1} variant="subtitle2">{getFrequencyPetLabel(pet.petSpecialNutritionalPlan.frequency)}</Typography>
                                </Grid>
                                <Grid size={{ md: 6 }}>
                                    <Typography fontWeight={600} variant="subtitle2">BỔ SUNG THÊM DINH DƯỠNG</Typography>
                                    <Typography mt={1} variant="subtitle2">{pet.petSpecialNutritionalPlan.nutritionalSupplements}</Typography>
                                </Grid>
                            </Grid>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ViewPetDesktop;
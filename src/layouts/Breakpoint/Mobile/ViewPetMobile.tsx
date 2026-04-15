import CommonImage from "@/components/Image/index";
import { COLORS } from "@/constants/colors";
import { IPet } from "@/types/pet";
import DateTime from "@/utils/DateTime";
import { CalendarMonth, CalendarToday, Female, LocalFlorist, LocationCityRounded, Male, MedicalServices, NavigateBefore, NavigateNext, Person, PestControl, Phone, Place, Vaccines } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import { getGenderPetLabel } from "@/utils/labelEntoVni";
import NavigateBack from "@/views/components/NavigateBack";

interface ViewPetMobileProps{
    pet: IPet
}

const ViewPetMobile = (props: ViewPetMobileProps) => {
    const { pet } = props;

    const age = dayjs().get('year') - dayjs(pet.dob).get('year')
    return(
        <Box p={2}>
            {/* Thông tin thú cưng */}
            <CommonImage
                src={pet.urlAvatar}
                sx={{ 
                    borderRadius: 5,
                    height: 250,
                    boxShadow: '2px 2px 5px rgba(0,0,0,0.3), 2px 2px 5px rgba(0,0,0,0.3)',
                    width: '100%'
                }}
            />
            <Typography 
                mt={2} sx={{ color: COLORS.PRIMARY }}
                fontWeight={600}
            >
                THÔNG TIN THÚ CƯNG
            </Typography>        
            <Typography mt={1} variant="h2" fontWeight={600}>
                {pet.name}
            </Typography>
            <Grid sx={{ mt: 1 }} container spacing={1.5}>
                <Grid size={{ xs: 3}}>
                    <Chip
                        label={getGenderPetLabel(pet.sex)}
                        sx={{ py: 2, bgcolor: '#fff', width: '100%', boxShadow: '1px 1px 5px rgba(0,0,0,0.3), 1px 1px 5px rgba(0,0,0,0.3)' }}
                        icon={pet.sex === "female" ? <Female sx={{ fontSize: 25, color: '#fff' }}/> : <Male/>}
                    />                  
                </Grid>
                <Grid size={{ xs: 3 }}>
                    <Chip
                        label={pet.species}
                        sx={{ py: 2, bgcolor: '#fff', width: '100%', boxShadow: '1px 1px 5px rgba(0,0,0,0.3), 1px 1px 5px rgba(0,0,0,0.3)' }}
                        icon={<LocalFlorist/>}
                    />
                </Grid>
                <Grid size={{ xs: 3 }}>
                    <Tooltip title={DateTime.FormatDate(pet.dob)}>
                        <Chip
                            label={DateTime.FormatDate(pet.dob)}
                            sx={{ py: 2, bgcolor: '#fff', width: '100%', boxShadow: '1px 1px 5px rgba(0,0,0,0.3), 1px 1px 5px rgba(0,0,0,0.3)' }}
                            icon={<CalendarMonth/>}
                        />
                    </Tooltip>
                </Grid>
                <Grid size={{ xs: 3 }}>
                    <Chip
                        label={`${age} tuổi`}
                        sx={{ py: 2, bgcolor: '#fff', width: '100%', boxShadow: '1px 1px 5px rgba(0,0,0,0.3), 1px 1px 5px rgba(0,0,0,0.3)' }}
                        icon={<CalendarToday/>}
                    />
                </Grid>
            </Grid>

            {/* ------------ THÔNG TIN Y TẾ ------------- */}
            <Paper sx={{ bgcolor: '#d8e7f0', p: 2, mt: 2, borderRadius: 3 }}>
                <Stack direction='row' display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography margin='auto 0' fontWeight={600}>Thông tin y tế thú cưng</Typography>
                    <IconButton
                        sx={{ p: 1.5, bgcolor: '#fff', borderRadius: 2 }}
                    >
                        <MedicalServices/>
                    </IconButton>
                </Stack>
                <Stack mt={1}>
                    <Person sx={{ margin: 'auto 0' }}/>
                    <Stack direction='column'>
                        <Typography fontWeight={500} variant="subtitle2">BÁC SĨ THÚ Y</Typography>
                        <Typography variant="subtitle2">{pet.petHealth.attendingVet}</Typography>
                    </Stack>
                </Stack>
                <Stack mt={1.5}>
                    <Phone sx={{ margin: 'auto 0' }}/>
                    <Stack direction='column'>
                        <Typography fontWeight={500} variant="subtitle2">SỐ ĐIỆN THOẠI</Typography>
                        <Typography variant="subtitle2">{pet.petHealth.phone}</Typography>
                    </Stack>
                </Stack>
                <Stack mt={1.5}>
                    <Place sx={{ margin: 'auto 0' }}/>
                    <Stack direction='column'>
                        <Typography fontWeight={500} variant="subtitle2">ĐỊA CHỈ PHÒNG KHÁM</Typography>
                        <Typography variant="subtitle2">{pet.petHealth.address}</Typography>
                    </Stack>
                </Stack>
            </Paper>

            {/* ------------ TIÊM PHÒNG ------------- */}
            <Stack mt={3} mb={1} direction='row' display='flex' justifyContent='space-between'>
                <Typography fontWeight={600}>Thông tin tiêm phòng</Typography>
                <IconButton>
                    <NavigateNext/>
                </IconButton>
            </Stack>
            {pet.petVaccination.slice(0,1).map((vac) => (
                <Paper sx={{ p: 2, bgcolor: '#fff', borderRadius: 2 }}>
                    <Grid container spacing={1.5}>
                        <Grid size={{ xs: 2 }}>
                            <IconButton
                                sx={{ bgcolor: COLORS.PRIMARY, width: 45, height: 45, borderRadius: 2 }}
                            >
                                <Vaccines sx={{ fontSize: 25, color: '#fff' }}/>
                            </IconButton>
                        </Grid>
                        <Grid size={{ xs: 7 }}>
                            <Typography variant="subtitle2" fontWeight={500}>{vac.medicationName}</Typography>
                            <Typography variant="caption">{vac.adverseReaction}</Typography>
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                            <Typography variant="subtitle2">{DateTime.FormatDate(vac.firstDoseDate)}</Typography>
                            <Typography variant="subtitle2">{DateTime.FormatDate(vac.boosterDate)}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            {/* ------------ TẨY GIUN ------------- */}
            <Stack mt={3} mb={1} direction='row' display='flex' justifyContent='space-between'>
                <Typography fontWeight={600}>Thông tin tẩy giun</Typography>
                <IconButton>
                    <NavigateNext/>
                </IconButton>
            </Stack>
            {pet.petDeworming.slice(0,1).map((dew) => (
                <Paper sx={{ p: 2, bgcolor: '#fff', borderRadius: 2 }}>
                    <Grid container spacing={1.5}>
                        <Grid size={{ xs: 2 }}>
                            <IconButton
                                sx={{ bgcolor: COLORS.PRIMARY, width: 45, height: 45, borderRadius: 2 }}
                            >
                                <PestControl sx={{ fontSize: 25, color: '#fff' }}/>
                            </IconButton>
                        </Grid>
                        <Grid size={{ xs: 10 }}>
                            <Typography variant="subtitle2" fontWeight={500}>{dew.medicationName}</Typography>
                            <Typography variant="caption">{dew.dosage}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                            <Paper sx={{ bgcolor: '#ececec', p: 2 , width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography fontWeight={500} variant="caption">Ngày tẩy giun: </Typography>
                                <Typography variant="caption">{DateTime.FormatDate(dew.dewormingDate)}</Typography>
                            </Paper>
                            <Paper sx={{ bgcolor: '#ececec', p: 2, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography fontWeight={500} variant="caption">Ngày tẩy lại: </Typography>
                                <Typography variant="caption">{DateTime.FormatDate(dew.nextDewormingDate)}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            {/* ------------ KHÁM ĐỊNH KỲ ------------- */}
            <Stack mt={3} mb={1} direction='row' display='flex' justifyContent='space-between'>
                <Typography fontWeight={600}>Thông tin khám định kỳ</Typography>
                <IconButton>
                    <NavigateNext/>
                </IconButton>
            </Stack>
            {pet.petRegularVetCheckup.slice(0,1).map((checkUp, index) => (
                <Paper sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, borderLeft: `5px solid ${COLORS.PRIMARY}` }}>
                    <Stack direction='row' display='flex' justifyContent='space-between'>
                        <Typography variant="subtitle2" fontWeight={600}>Khám định kỳ lần {index + 1}</Typography>
                        <Typography variant="caption">{DateTime.FormatDate(checkUp.examinationDate)}</Typography>
                    </Stack>
                    <Stack my={1} direction='row'>
                        <Typography fontWeight={500} variant="caption">Tình trạng sức khỏe: </Typography>
                        <Typography variant="caption">{checkUp.healthCondition}</Typography>
                    </Stack>
                    <Stack direction='row'>
                        <Typography fontWeight={500} variant="caption">Kết luận: </Typography>
                        <Typography variant="caption">{checkUp.conclusion}</Typography>
                    </Stack>
                </Paper>
            ))}
        </Box>
    )
}

export default ViewPetMobile;
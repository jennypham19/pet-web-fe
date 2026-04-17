import { COLORS } from "@/constants/colors";
import { IPetVaccination } from "@/types/pet";
import DateTime from "@/utils/DateTime";
import NavigateBack from "@/views/components/NavigateBack";
import { Add, ArrowForward, CalendarMonth, CalendarToday, Vaccines } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Divider, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddVaccination from "./AddVaccination";
import { useGetData } from "@/hooks/useGetData";
import { getPetVaccinations } from "@/services/pet-service";
import CustomPagination from "@/components/Pagination/CustomPagination";

interface VaccinationProps{
    onBack: () => void;
    id: string;
}

const Vaccination = (props: VaccinationProps) => {
    const { onBack, id } = props;
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const { listData, page, rowsPerPage, searchTerm, handlePageChange, handleSearch, total, fetchData } = useGetData<IPetVaccination>(getPetVaccinations, 4, id)

    const handleReload = () => {
        fetchData(id, page, rowsPerPage)
    }

    const handleOpenAddVaccination = () => {
        setOpen(true)
    }

    const handleCloseAddVaccination = () => {
        setOpen(false);
    }
    return(
        <Box px ={1} py={2}>
            <Box display='flex' justifyContent='space-between'>
                <NavigateBack
                    title="Danh sách tiêm chủng"
                    onBack={onBack}
                />
                {md ? (
                    <Tooltip title='Thêm lịch tiêm'>
                        <IconButton
                            onClick={handleOpenAddVaccination}
                            sx={{ bgcolor: COLORS.PRIMARY, borderRadius: '50%', width: 30, height: 30 }}
                        >
                            <Add/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Button
                        sx={{ bgcolor: COLORS.PRIMARY, borderRadius: 5 }}
                        startIcon={<Add/>}
                        onClick={handleOpenAddVaccination}
                    >
                        Thêm lịch tiêm
                    </Button>                    
                )}
            </Box>
            <Grid sx={{ mt: 2, p: 1 }} container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={2}>
                        {listData.map((vac, index) => (
                            <Grid key={index} size={{ xs: 12, md: 6 }}>
                                <Card
                                    sx={{ cursor: 'pointer', borderRadius: 3, boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)' }}
                                >
                                    <CardContent>
                                        <Stack direction='row' gap={2} display='flex' alignItems='center'>
                                            <IconButton
                                                sx={{ bgcolor: "#e4e4e4", width: 40, height: 40, borderRadius: 1.5 }}
                                            >
                                                <Vaccines/>
                                            </IconButton>
                                            <Typography fontWeight={600} margin='auto 0'>{vac.medicationName}</Typography>
                                        </Stack>
                                        <Stack gap={1} mt={2} display='flex' alignItems='center'>
                                            <CalendarToday sx={{ margin: 'auto 0' }}/>
                                            <Stack direction='column'>
                                                <Typography fontWeight={500} variant="subtitle2">Ngày tiêm</Typography>
                                                <Typography variant="subtitle2">{DateTime.FormatDate(vac.firstDoseDate)}</Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack gap={1} mt={2} display='flex' alignItems='center'>
                                            <CalendarMonth sx={{ margin: 'auto 0' }}/>
                                            <Stack direction='column'>
                                                <Typography fontWeight={500} variant="subtitle2">Ngày tiêm nhắc lại</Typography>
                                                <Typography variant="subtitle2">{DateTime.FormatDate(vac.boosterDate)}</Typography>
                                            </Stack>
                                        </Stack>
                                        <Divider sx={{ my: 2 }}/>
                                        <Stack direction='column'>
                                            <Typography color="text.secondary" variant="subtitle2">PHẢN ỨNG SAU TIÊM</Typography>
                                            <Typography variant="subtitle2">{vac.adverseReaction}</Typography>
                                        </Stack> 
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box display='flex' flexDirection='column' p={2} borderRadius={3} border='1px dotted' bgcolor='#e9e7e7' height={{ xs: '100%', md: 295 }}>
                        <Typography fontWeight={600}>Mẹo chăm sóc</Typography>
                        <Typography mt={1} variant="caption">Giữ cho thú cưng thoải mái sau khi tiêm chủng bằng cách cung cấp đủ nước và nơi nghỉ yên tĩnh.</Typography>
                        <Stack sx={{ cursor: 'pointer' }} mt={2}>
                            <Typography fontWeight={500} fontStyle='italic' component='a'  variant="caption">Xem hướng dẫn chăm sóc</Typography>
                            <ArrowForward fontSize='small'/>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={2} display='flex' justifyContent='center'>
                <CustomPagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    count={total}
                    onPageChange={handlePageChange}
                />
            </Box>
            {open && id && (
                <AddVaccination
                    open={open}
                    onClose={handleCloseAddVaccination}
                    id={id}
                    onReload={handleReload}
                />
            )}
        </Box>
    )
}

export default Vaccination;
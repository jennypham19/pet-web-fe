import { COLORS } from "@/constants/colors";
import { useGetData } from "@/hooks/useGetData";
import { getPetRegularVetCheckups } from "@/services/pet-service";
import { IPetRegularVetCheckup } from "@/types/pet";
import NavigateBack from "@/views/components/NavigateBack";
import { Add, CalendarMonth, CalendarToday, HealthAndSafety } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Divider, IconButton, Paper, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2"
import DateTime from "@/utils/DateTime";
import CustomPagination from "@/components/Pagination/CustomPagination";
import AddRegularVetCheckup from "./AddRegularVetCheckup";

interface RegularVetCheckupProps{
    onBack: () => void;
    id: string
}

const RegularVetCheckup = (props: RegularVetCheckupProps) => {
    const { onBack, id } = props;
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const { listData, page, rowsPerPage, searchTerm, handlePageChange, handleSearch, total, fetchData } = useGetData<IPetRegularVetCheckup>(getPetRegularVetCheckups, 4, id)

    const handleReload = () => {
        fetchData(id, page, rowsPerPage)
    }

    const handleOpenAddRegularVetCheckup = () => {
        setOpen(true)
    }

    const handleCloseAddRegularVetCheckup = () => {
        setOpen(false);
    }

    return(
        <Box px ={1} py={2}>
            <NavigateBack
                title="Danh sách khám định kỳ"
                onBack={onBack}
            />
            <Grid sx={{ mt: 2}} container spacing={2}>
                {listData.map((checkUp, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                        <Card
                            sx={{ cursor: 'pointer', borderRadius: 3, boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)' }}
                        >
                            <CardContent>
                                <Stack display='flex' justifyContent='space-between'>
                                    <Stack direction='row' display='flex' alignItems='center'>
                                        <IconButton
                                            sx={{ bgcolor: "#e4e4e4", width: 30, height: 30, borderRadius: 1.5 }}
                                        >
                                            <HealthAndSafety/>
                                        </IconButton>
                                        <Typography fontWeight={600} margin='auto 0'>Lần khám {index + 1}</Typography>
                                    </Stack>
                                    <Stack direction='row' display='flex' alignItems='center'>
                                        <CalendarToday sx={{ margin: 'auto 0' }}/>
                                        <Typography variant="subtitle2">{DateTime.FormatDate(checkUp.examinationDate)}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack mt={2} direction='column'>
                                    <Typography fontWeight={500} variant="subtitle2">TÌNH TRẠNG SỨC KHỎE</Typography>
                                    <Grid container spacing={1}>
                                        {checkUp.healthCondition.split(",").map((health, index) => (
                                            <Grid key={index} size={{ xs: 4 }}>
                                                <Tooltip title={health}>
                                                    <Chip
                                                        label={health}
                                                        color="default"
                                                        sx={{ width: '100%' }}
                                                    />
                                                </Tooltip>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Stack>
                                <Paper sx={{ mt: 2, bgcolor: '#e7e4e4', borderRadius: 2, p: 2 }}>
                                    <Stack direction='column'>
                                        <Typography fontWeight={500} variant="subtitle2">KẾT LUẬN BÁC SĨ</Typography>
                                        <Typography variant="subtitle2">{checkUp.conclusion}</Typography>
                                    </Stack>
                                </Paper>
                                <Divider sx={{ my: 2 }}/>
                                <Stack gap={1}>
                                    <CalendarMonth sx={{ margin: 'auto 0' }}/>
                                    <Stack>
                                        <Typography fontWeight={500} variant="subtitle2">Ngày khám lại:</Typography>
                                        <Typography variant="subtitle2">{DateTime.FormatDate(checkUp.recheckDate)}</Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box mt={2} display='flex' justifyContent='center'>
                <CustomPagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    count={total}
                    onPageChange={handlePageChange}
                />
                <Paper onClick={handleOpenAddRegularVetCheckup} sx={{ mt: 5, p: 2,  border: `2px dashed #dfdddd`, borderRadius: 2, display: 'flex', flexDirection: 'row', gap: 2, cursor: 'pointer' }}>
                    <IconButton
                        sx={{ 
                            width: 40, height: 40, bgcolor: COLORS.PRIMARY, borderRadius: '50%',
                            ':hover': {
                                bgcolor: COLORS.PRIMARY
                            }
                        }}
                    >
                        <Add sx={{ color: '#fff'}}/>
                    </IconButton>
                    <Typography margin='auto 0'>Thêm hồ sơ khám mới</Typography>
                </Paper>
            </Box>

            {open && id && (
                <AddRegularVetCheckup
                    open={open}
                    onClose={handleCloseAddRegularVetCheckup}
                    id={id}
                    onReload={handleReload}
                />
            )}
        </Box>
    )
}

export default RegularVetCheckup;
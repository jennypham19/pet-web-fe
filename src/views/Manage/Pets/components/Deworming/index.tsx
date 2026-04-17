import { COLORS } from "@/constants/colors";
import { useGetData } from "@/hooks/useGetData";
import { getPetDewormings } from "@/services/pet-service";
import { IPetDeworming, IPetVaccination } from "@/types/pet";
import NavigateBack from "@/views/components/NavigateBack";
import { Add, CalendarMonth, CalendarToday, PestControl } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2"
import DateTime from "@/utils/DateTime";
import CustomPagination from "@/components/Pagination/CustomPagination";
import AddDeworming from "./AddDeworming";

interface DewormingProps{
    onBack: () => void;
    id: string;
}

const Deworming = (props: DewormingProps) => {
    const { onBack, id } = props;
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const { listData, page, rowsPerPage, searchTerm, handlePageChange, handleSearch, total, fetchData } = useGetData<IPetDeworming>(getPetDewormings, 4, id)

    const handleReload = () => {
        fetchData(id, page, rowsPerPage)
    }

    const handleOpenAddDeworming = () => {
        setOpen(true)
    }

    const handleCloseAddDeworming = () => {
        setOpen(false);
    }

    return(
        <Box px ={1} py={2}>
            <Box display='flex' justifyContent='space-between'>
                <NavigateBack
                    title="Danh sách tẩy giun"
                    onBack={onBack}
                />
                {md ? (
                    <Tooltip title='Thêm lịch tẩy giun'>
                        <IconButton
                            onClick={handleOpenAddDeworming}
                            sx={{ bgcolor: COLORS.PRIMARY, borderRadius: '50%', width: 30, height: 30 }}
                        >
                            <Add/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Button
                        sx={{ bgcolor: COLORS.PRIMARY, borderRadius: 5 }}
                        startIcon={<Add/>}
                        onClick={handleOpenAddDeworming}
                    >
                        Thêm lịch tẩy giun
                    </Button>                    
                )}
            </Box>
            <Grid sx={{ mt: 2}} container spacing={2}>
                {listData.map((dew, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                        <Card
                            sx={{ cursor: 'pointer', borderRadius: 3, boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)' }}
                        >
                            <CardContent>
                                <Stack direction='row' gap={2} display='flex' alignItems='center'>
                                    <IconButton
                                        sx={{ bgcolor: "#e4e4e4", width: 40, height: 40, borderRadius: 1.5 }}
                                    >
                                        <PestControl/>
                                    </IconButton>
                                    <Typography fontWeight={600} margin='auto 0'>{dew.medicationName}</Typography>
                                </Stack>
                                <Stack gap={1} mt={2} display='flex' alignItems='center'>
                                    <CalendarToday sx={{ margin: 'auto 0' }}/>
                                    <Stack direction='column'>
                                        <Typography fontWeight={500} variant="subtitle2">Ngày tẩy</Typography>
                                        <Typography variant="subtitle2">{DateTime.FormatDate(dew.dewormingDate)}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack gap={1} mt={2} display='flex' alignItems='center'>
                                    <CalendarMonth sx={{ margin: 'auto 0' }}/>
                                    <Stack direction='column'>
                                        <Typography fontWeight={500} variant="subtitle2">Ngày tẩy nhắc lại</Typography>
                                        <Typography variant="subtitle2">{DateTime.FormatDate(dew.nextDewormingDate)}</Typography>
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
            </Box>
            {open && id && (
                <AddDeworming
                    open={open}
                    onClose={handleCloseAddDeworming}
                    id={id}
                    onReload={handleReload}
                />
            )}
        </Box>
    )
}

export default Deworming;
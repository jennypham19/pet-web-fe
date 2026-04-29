import { generateCalendar, selectedDate } from "@/utils/calendar";
import { Box, Card, Chip, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Grid from "@mui/material/Grid2"
import { COLORS } from "@/constants/colors";
import { weekDays } from "@/constants/calendar";
import { ImagesTask } from "@/services/task-service";
import DialogListImages from "../DialogListImages";

interface CalendarRecentlyProps{
    md: boolean;
    onSelected: (date: any) => void;
    imagesTask: ImagesTask[]
}

const CalendarRecently = (props: CalendarRecentlyProps) => {
    const { md, onSelected, imagesTask } = props;
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const selectedDay = new Date().getDate();
    const [openImages, setOpenImages] = useState(false);
    const [dateSelected, setDateSelected] = useState<any>(null)
    
    const days = useMemo(() => {
        return generateCalendar(month, year);
    }, [])

    // Convert API data => map theo yyyy-mm-dd
    const imageMap = useMemo(() => {
        const result: Record<string, any[]> = {};
        imagesTask.forEach((item) => {
            const date = new Date(item.dueDate);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            result[key] = item.images || []
        });
        
        return result
    }, [imagesTask])
    return(
        <Card
                sx={{
                    mt: 3,
                    borderRadius: 3,
                    p: 3,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                }}
        >
                {/* Header */}
                <Box display='flex' justifyContent='center' mb={3}>
                    <Chip
                        label={`Tháng ${month} - ${year}`}
                        sx={{
                            p: 1.5,
                            fontWeight: 600,
                            borderRadius: 2,
                            bgcolor: '#fff',
                            border: `1px solid ${COLORS.PRIMARY}`,
                            color: '#000',
                            fontSize: 15
                        }}
                    />
                </Box>

                {/* Week title */}
                <Grid container columns={7} spacing={0}>
                    {md ? (
                        weekDays.map((item) => (
                            <Grid size={1} key={item.en}>
                                <Box textAlign='center' py={1}>
                                    <Typography fontWeight={500} fontSize={15}>{item.en}</Typography>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        weekDays.map((item) => (
                            <Grid size={1} key={item.vi}>
                                <Box textAlign='center' py={1}>
                                    <Typography fontWeight={500} fontSize={15}>{item.vi}</Typography>
                                </Box>
                            </Grid>
                        ))
                    )}
                </Grid>

                {/* Days */}
                <Grid sx={{ mt: 2 }} container columns={7}>
                    {days.map((item, index) => {
                        const active = item.day === selectedDay && item.currentMonth;

                        const today = new Date();

                        let cellDate = selectedDate(year, month, item.day, item.currentMonth);

                        // chỉ click ngày nhỏ hơn hôm nay
                        const canClick = cellDate.getTime() < today.getTime();

                        const key = `${cellDate.getFullYear()}-${cellDate.getMonth() + 1}-${cellDate.getDate()}`;
                        const images = imageMap[key] || [];
                        
                        return(
                            <Grid size={1} key={index}>
                                <Box
                                    sx={{
                                        minHeight: { xs: 60,  md: 105 },
                                        borderTop: `1px solid #f0f0f0`,
                                        // borderBottom: `1px solid #f0f0f0`,
                                        p: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    {/* Day Number */}
                                    <Box 
                                        mb={1} 
                                    >
                                        <Typography
                                            onClick={() => {
                                                if(!canClick) return;
                                                onSelected(cellDate)
                                            }}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                lineHeight: '30px',
                                                mx: 'auto',
                                                borderRadius: '50%',
                                                fontSize: 15,
                                                color: active ? '#fff' : item.currentMonth ? '#222' : '#c5c5c5',
                                                bgcolor: active ? '#36a9e1' : 'transparent',
                                                fontWeight: active ? 700 : 500,
                                                cursor: canClick ? 'pointer' : 'not-allowed',
                                                opacity: canClick ? 1 : 0.45,
                                                pointerEvents: canClick ? 'auto' : 'none',
                                            }}
                                        >
                                            {String(item.day).padStart(2, '0')}
                                        </Typography>
                                        {images.length > 0 && (
                                            <Box
                                                component='img'
                                                src={images[0].urlImage}
                                                sx={{
                                                    mt: 1.5, width: { xs: '100%', md: 100}, height: { xs: '100%', height: 80 },
                                                    borderRadius: 2,
                                                    objectFit: 'fill',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => {
                                                    setOpenImages(true)
                                                    setDateSelected(cellDate)
                                                }}
                                            />                                           
                                        )}
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
                {openImages && dateSelected && (
                    <DialogListImages
                        open={openImages}
                        onClose={() => { setOpenImages(false); setDateSelected(null) }}
                        date={dateSelected}
                    />
                )}
        </Card>
    )
}

export default CalendarRecently;
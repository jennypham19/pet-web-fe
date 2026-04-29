import { COLORS } from "@/constants/colors";
import { generateCalendar } from "@/utils/calendar";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Card, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { useState } from "react";
import CalendarBySelectedDate from "./CalendarBySelectedDate";
import { ImagesTask } from "@/services/task-service";

interface CalendarAllProps{
    md: boolean;
    imagesTask: ImagesTask[]
}

const activeBtn = {
  borderRadius: "10px !important",
  px: 2.5,
  textTransform: "none",
  border: "1px solid #36a9e1 !important",
  bgcolor: "#36a9e1",
  color: "#fff",
  fontWeight: 700,
};

const normalBtn = {
  borderRadius: "10px !important",
  px: 2.5,
  textTransform: "none",
  border: "1px solid #36a9e1 !important",
  color: "#222",
  fontWeight: 600,
};

const yearNav = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  cursor: "pointer",
  px: 2,
  py: 1,
  borderRadius: 2,
  transition: "0.2s",
  "&:hover": {
    bgcolor: "transparent",
  },
};

const CalendarAll = (props: CalendarAllProps) => {
    const { md, imagesTask } = props;
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const weekDays = ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'];
    const [openCalendarSelected, setOpenCalendarSelected] = useState(false);
    const [calendar, setCalendar] = useState<{month: any, year: any}>({ month: null, year: null })
    return(
        <Box mt={3}>
            {!openCalendarSelected && (
                <>
                    {/* Year selector */}
                    <Card
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 3,
                        }}
                    >
                        <Box
                            onClick={() => setYear((prev) => prev - 1)}
                            sx={yearNav}
                        >
                            <KeyboardArrowLeft />
                            <Typography fontWeight={600}>Năm trước</Typography>
                        </Box>

                        <Chip
                            label={year}
                            sx={{
                                fontSize: 18,
                                px: 2,
                                height: 42,
                                fontWeight: 700,
                                borderRadius: 3,
                                bgcolor: "#36a9e1",
                                color: "#fff",
                            }}
                        />

                        <Box
                            onClick={() => {
                                if(year >= currentYear) return;
                                setYear((prev) => prev + 1)
                            }}
                            sx={{
                                ...yearNav,
                                cursor: year >= currentYear ? "not-allowed" : "pointer",
                                opacity: year >= currentYear ? 0.45 : 1,
                                pointerEvents: "auto",
                            }}
                        >
                            <Typography fontWeight={600}>Năm sau</Typography>
                            <KeyboardArrowRight />
                        </Box>
                    </Card>
                    <Grid container spacing={2}>
                        {months.map((month) => {
                            const days = generateCalendar(month, year);
                            const currentMonth = new Date().getMonth() + 1;
                            const currentMonthYear = new Date(currentYear, currentMonth);
                            let cardMonthYear: Date;
                            cardMonthYear = new Date(year, month);
                            const canClick = cardMonthYear <= currentMonthYear;
                            
                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={month}>
                                    <Card
                                        onClick={() => {
                                            if(!canClick) return;
                                            setOpenCalendarSelected(true)
                                            setCalendar({ month: month, year: year})
                                        }}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            minHeight: 220,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',                                
                                            cursor: canClick ? 'pointer' : 'not-allowed',
                                            opacity: canClick ? 1 : 0.45,
                                            pointerEvents: canClick ? 'auto' : 'none',
                                        }}
                                    >
                                        <Box display='flex' justifyContent='center' mb={1.5}>
                                            <Chip
                                                label={`Tháng ${month} - ${year}`}
                                                sx={{
                                                    p: 1.5,
                                                    fontWeight: 600,
                                                    borderRadius: 2,
                                                    bgcolor: '#fff',
                                                    border: `1px solid ${COLORS.PRIMARY}`,
                                                    color: '#000',
                                                    fontSize: 14
                                                }}
                                            />
                                        </Box>

                                        {/* weekday */}
                                        <Grid container columns={7}>
                                            {weekDays.map((item) => (
                                                <Grid size={1} key={item}>
                                                    <Typography
                                                        align="center"
                                                        fontSize={12}
                                                        fontWeight={500}
                                                        mb={1}
                                                    >
                                                        {item}
                                                    </Typography>
                                                </Grid>
                                            ))}
                                        </Grid>

                                        {/* days */}
                                        <Grid container columns={7} rowSpacing={0.7}>
                                            {days.map((item, index) => (
                                                <Grid size={1} key={index}>
                                                    <Typography
                                                        align="center"
                                                        fontSize={12}
                                                        fontWeight={500}
                                                        mb={1}
                                                        color={item.currentMonth ? '#222' : '#c8c8c8'}
                                                    >
                                                        {String(item.day).padStart(2, '0')}
                                                    </Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>                
                </>
            )}
            {openCalendarSelected && calendar.month && calendar.year && (
                <CalendarBySelectedDate
                    calendar={calendar}
                    onBack={() => {
                        setOpenCalendarSelected(false)
                        setCalendar({ month: null, year: null })
                    }}
                    imagesTask={imagesTask}
                />
            )}
        </Box>
    )
}

export default CalendarAll
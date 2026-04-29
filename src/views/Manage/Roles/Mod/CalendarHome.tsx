import { COLORS } from "@/constants/colors";
import { CalendarMonth, CalendarToday, FilterAlt, History } from "@mui/icons-material";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { DATA_FILTER_CALENDAR } from "@/constants/calendar";
import CalendarMonthPrevious from "../../Home/components/calendar/CalendarMonthPrevious";
import CalendarRecently from "../../Home/components/calendar/CalendarRecently";
import CalendarYearPrevious from "../../Home/components/calendar/CalendarYearPrevious";
import CalendarAll from "../../Home/components/calendar/CalendarAll";
import DashboardInMod from "./Home";
import { getListImagesTask, ImagesTask } from "@/services/task-service";

const DATA_CALENDAR = [
    {
        id: 1,
        label: 'Tất cả',
        value: 'all',
        icon: <FilterAlt sx={{ mr: 1, fontSize: 18 }}/>
    },
    {
        id: 2,
        label: 'Gần đây',
        value: 'recently',
        icon: <History sx={{ mr: 1, fontSize: 18 }}/>
    },
    {
        id: 3,
        label: 'Tháng trước',
        value: 'last_month',
        icon: <CalendarMonth sx={{ mr: 1, fontSize: 18 }}/>
    },
    {
        id: 4,
        label: 'Năm trước',
        value: 'last_year',
        icon: <CalendarToday sx={{ mr: 1, fontSize: 18 }}/>
    }
]


const CalendarHomeInMod = () => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [filter, setFilter] = useState<string>('recently'); 
    const [date, setDate] = useState<any>(null);
    const [openSelected, setOpenSelected] = useState(false);
    const [imagesTask, setImagesTask] = useState<ImagesTask[]>([]);

    const getImagesTask = async() => {
        const res = await getListImagesTask();
        const data = res.data as any as ImagesTask[];
        setImagesTask(data)
    }

    useEffect(() => {
        getImagesTask()
    }, [])

    const handleChange = (newValue: string) => {
        setFilter(newValue);
    }

    const handleSelected = (day: any) => {
        setDate(day)
        setOpenSelected(true)
    }
    return(
        <Box>
            {!openSelected && (
                <Box p={2}>
                {/* Filter */}
                <Box mb={2} display='flex' gap={2} flexDirection={{ xs: 'column', md: 'row'}}>
                    {DATA_CALENDAR.map((data, index) => (
                        <Button
                            onClick={() => handleChange(data.value)}
                            key={index}
                            variant="outlined"
                            sx={{ 
                                border: `1px solid ${COLORS.PRIMARY}`, 
                                bgcolor: filter === data.value ? COLORS.PRIMARY : '#fff', 
                                color: filter === data.value ? '#fff' : '#000', p: 1, 
                                width: { xs: '100%', md: 150 }, borderRadius: 2, fontSize: 14
                            }}
                            startIcon={data.icon}
                        >
                            {data.label}
                        </Button>
                    ))}
                </Box>

                {/* Calendar tất cả */}
                {filter === DATA_FILTER_CALENDAR.ALL && (
                    <CalendarAll
                        md={md}
                        imagesTask={imagesTask}
                    />
                )}

                {/* Calendar gần đây */}
                {filter === DATA_FILTER_CALENDAR.RECENTLY && (
                    <CalendarRecently
                        md={md}
                        onSelected={handleSelected}
                        imagesTask={imagesTask}
                    />
                )}

                {/* Calendar tháng trước */}
                {filter === DATA_FILTER_CALENDAR.LAST_MONTH && (
                    <CalendarMonthPrevious
                        md={md}
                        onSelected={handleSelected}
                        imagesTask={imagesTask}
                    />
                )}

                {/* Calendar năm trước */}
                {filter === DATA_FILTER_CALENDAR.LAST_YEAR && (
                    <CalendarYearPrevious
                        md={md}
                        onSelected={handleSelected}
                        imagesTask={imagesTask}
                    />
                )}
                </Box>
            )}
            {openSelected && date && (
                <DashboardInMod
                    date={date}
                    onBack={() => {
                        setDate(null);
                        setOpenSelected(false)
                    }}
                />
            )}
        </Box>    
    )
}

export default CalendarHomeInMod
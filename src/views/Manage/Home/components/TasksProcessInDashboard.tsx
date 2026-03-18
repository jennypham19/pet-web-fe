import ViewData from "@/views/components/ViewData";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import dog from "@/assets/images/users/dog.png";
import dog_1 from "@/assets/images/users/alaska.png";
import dog_2 from "@/assets/images/users/soc.png";
import dayjs from "dayjs";
import CardData from "@/views/components/CardData";
import Grid from "@mui/material/Grid2";
import Header from "@/layouts/Dashboard/Header";

const DATA_PET = [
    {
        id: 1,
        name: 'Milo',
        image: dog
    },
    {
        id: 2,
        name: 'Sữa',
        image: dog_1
    },
    {
        id: 3,
        name: 'Bơ',
        image: dog_2
    }
]

const DATA_TASKS_PROCESS = [
    {
        id: 1,
        name: 'Cho chó ăn sáng',
        pet: DATA_PET,
        status: 'pending',
        date: dayjs()
    },
    {
        id: 2,
        name: 'Cho chó ăn sáng',
        pet: DATA_PET,
        status: 'in_progress',
        date: dayjs()
    },
    {
        id: 3,
        name: 'Cho chó ăn sáng',
        pet: DATA_PET,
        status: 'in_progress',
        date: dayjs()
    },
    {
        id: 4,
        name: 'Cho chó ăn sáng',
        pet: DATA_PET,
        status: 'completed',
        date: dayjs()
    },
]

const CardListPets = () => {
    return(
        <CardData>
            <Box></Box>
        </CardData>
    )
}

const TableListPets = () => {
    return(
        <Grid sx={{ mt: 1, bgcolor: '#fff', p: 1, borderRadius: 3 }} container spacing={2}>
            {['Công việc', 'Thú cưng', 'Trạng thái', 'Thời gian', 'Thao tác'].map((header) => (
                <Grid size={{ md: 2.4 }}>
                    <Typography variant="subtitle2" fontWeight={500} align="center">{header}</Typography>
                </Grid>
            ))}
        </Grid>
    )
}

const TasksProcessInDashboard = () => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    return(
        <Box p={2}>
            <ViewData
                label="Tiến độ công việc"
                onClick={() => {}}
            />
            {md ? (
                <CardListPets/>
            ) : (
                <TableListPets/>
            )}
        </Box>
    )
}

export default TasksProcessInDashboard;
import dayjs from "dayjs";



import { BorderColorOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, IconButton as IconButtonMui, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import IconButton from "@/components/IconButton/IconButton";



import dog_1 from "@/assets/images/users/alaska.png";
import dog from "@/assets/images/users/dog.png";
import dog_2 from "@/assets/images/users/soc.png";
import { COLORS } from "@/constants/colors";
import DateTime from "@/utils/DateTime";
import { getStatusTaskColor, getStatusTaskLabel } from "@/utils/labelEntoVni";
import CardData from "@/views/components/CardData";
import ViewData from "@/views/components/ViewData";
import { useFetchData } from "@/hooks/useFetchData";
import { ITask } from "@/types/task";
import { getTasks } from "@/services/task-service";


const DATA_PET = [
    {
        id: 1,
        name: 'Milo',
        image: dog,
    },
    {
        id: 2,
        name: 'Sữa',
        image: dog_1,
    },
    {
        id: 3,
        name: 'Bơ',
        image: dog_2,
    },
    {
        id: 4,
        name: 'Bơ',
        image: dog_2,
    },
];

const DATA_TASKS_PROCESS = [
    {
        id: 1,
        name: 'Cho chó ăn sáng',
        pets: DATA_PET,
        status: 'pending',
        date: dayjs()
    },
    {
        id: 2,
        name: 'Cho chó ăn sáng',
        pets: DATA_PET,
        status: 'in_progress',
        date: dayjs()
    },
    {
        id: 3,
        name: 'Cho chó ăn sáng',
        pets: DATA_PET,
        status: 'in_progress',
        date: dayjs()
    },
    {
        id: 4,
        name: 'Cho chó ăn sáng',
        pets: DATA_PET,
        status: 'completed',
        date: dayjs()
    },
]

const CardListPets = ({ tasks } : { tasks: ITask[] }) => {
    return(
        <CardData>
            <Box></Box>
        </CardData>
    )
}

const TableListPets = ({ tasks } : { tasks: ITask[] }) => {
    return (
      <>
        <Grid sx={{ mt: 1, bgcolor: '#fff', p: 1, borderRadius: 3 }} container spacing={2}>
          {['Công việc', 'Thú cưng', 'Trạng thái', 'Thời gian', 'Thao tác'].map((header) => (
            <Grid key={header} sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant='subtitle2' fontWeight={500}>
                {header}
              </Typography>
            </Grid>
          ))}
        </Grid>
        {tasks.slice(0,4).map((task, index) => (
          <Grid
            key={index}
            sx={{ mt: 1, bgcolor: '#fff', p: 2, borderRadius: 3 }}
            container
            spacing={2}
          >
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant='subtitle2'>{task.name}</Typography>
            </Grid>
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              <Box display='flex' flexDirection='row' justifyContent='center'>
                {task.pets.slice(0, 3).map((pet, idx) => (
                  <Tooltip key={idx} title={pet.name}>
                    <Avatar src={pet.urlAvatar} sx={{ borderRadius: '50%' }} />
                  </Tooltip>
                ))}
                <Tooltip title='Xem thêm'>
                  <IconButtonMui
                    sx={{
                      border: '1px solid #000',
                      borderRadius: '50%',
                      bgcolor: 'rgba(0,0,0,0.1)',
                      width: 40,
                      height: 40
                    }}
                  >
                    <Typography variant='subtitle2' fontWeight={500}>+{task.pets.length - 3}</Typography>
                  </IconButtonMui>
                </Tooltip>
              </Box>
            </Grid>
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              <Chip
                label={getStatusTaskLabel(task.status)}
                color={getStatusTaskColor(task.status).color}
              />
            </Grid>
            <Grid sx={{ flex: 1, textAlign: 'center' }}>{DateTime.FormatHour(task.hour)}</Grid>
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              <IconButton
                tooltip='Chỉnh sửa'
                handleFunt={() => {}}
                icon={<BorderColorOutlined sx={{ color: COLORS.PRIMARY }} />}
                sx={{ boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.3)', mr: 1 }}
              />
              <IconButton
                tooltip='Xem chi tiết'
                handleFunt={() => {}}
                icon={<VisibilityOutlined sx={{ color: COLORS.PRIMARY }} />}
                sx={{ boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.3)' }}
              />
            </Grid>
          </Grid>
        ))}
      </>
    );
}

const TasksProcessInDashboard = () => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const { listData } = useFetchData<ITask>(getTasks)
    return(
        <Box p={2}>
            <ViewData
                label="Tiến độ công việc"
                onClick={() => {}}
            />
            {md ? (
                <CardListPets tasks={listData}/>
            ) : (
                <TableListPets tasks={listData}/>
            )}
        </Box>
    )
}

export default TasksProcessInDashboard;
import dayjs from "dayjs";



import { BorderColorOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, IconButton as IconButtonMui, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import IconButton from "@/components/IconButton/IconButton";
import { COLORS } from "@/constants/colors";
import { useFetchData } from "@/hooks/useFetchData";
import { getTasks } from "@/services/task-service";
import { ITask } from "@/types/task";
import DateTime from "@/utils/DateTime";
import { getStatusTaskColor, getStatusTaskLabel } from "@/utils/labelEntoVni";
import CardData from "@/views/components/CardData";
import ViewData from "@/views/components/ViewData";
import { useEffect } from "react";
import PetsAvatar from "@/views/components/PetsAvatar";


const CardListPets = ({ tasks, onHandle } : { tasks: ITask[], onHandle: (id: string, type: string) => void }) => {
    return(
      <Box display='flex' gap={1} flexDirection='column'>
        {tasks.slice(0,2).map((task, index) => (
          <CardData key={index}>
              <Box display='flex' justifyContent='space-between'>
                <Chip
                  label={getStatusTaskLabel(task.status)}
                  color={getStatusTaskColor(task.status).color}
                />
                <Typography variant='subtitle2'>{DateTime.FormatDateHour(task.hour)}</Typography>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Typography my={2} variant='h6' fontWeight={600}>{task.name}</Typography>
                <Stack mt={1}>
                  {task.status === 'pending' && (
                    <Tooltip title="Chỉnh sửa">
                      <IconButtonMui
                        onClick={(e: any) => {
                          e.stopPropagation();
                          onHandle(task.id, 'update')
                        }}
                        
                        sx={{ borderRadius: '50%', backgroundColor: '#E1E3E4', width: 36, height: 36 }}
                      >
                          <BorderColorOutlined sx={{ color: COLORS.PRIMARY }} />
                      </IconButtonMui>
                    </Tooltip>
                  )}
                  <Tooltip title="Xem chi tiết">
                    <IconButtonMui
                      onClick={(e: any) => {
                        e.stopPropagation();
                        onHandle(task.id, 'view')
                      }}
                        
                      sx={{ borderRadius: '50%', backgroundColor: '#E1E3E4', width: 36, height: 36 }}
                    >
                      <VisibilityOutlined sx={{ color: COLORS.PRIMARY }} />
                    </IconButtonMui>
                  </Tooltip>
                </Stack>
              </Box>
              <PetsAvatar
                pets={task.pets}
              />
          </CardData>        
        ))}
      </Box>  
    )
}

const TableListPets = ({ tasks, onHandle } : { tasks: ITask[], onHandle: (id: string, type: string) => void }) => {
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
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant='subtitle2'>{DateTime.FormatDateHour(task.hour)}</Typography>
            </Grid>
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              {task.status === 'pending' && (
                <IconButton
                  tooltip='Chỉnh sửa'
                  handleFunt={() => onHandle(task.id, 'update')}
                  icon={<BorderColorOutlined sx={{ color: COLORS.PRIMARY }} />}
                  sx={{ boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.3)', mr: 1 }}
                />
              )}
              <IconButton
                tooltip='Xem chi tiết'
                handleFunt={() => onHandle(task.id, 'view')}
                icon={<VisibilityOutlined sx={{ color: COLORS.PRIMARY }} />}
                sx={{ boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.3)' }}
              />
            </Grid>
          </Grid>
        ))}
      </>
    );
}

const TasksProcessInDashboard = ({ isReload, onHandle, onClick }: { isReload: boolean, onHandle: (id: string, type: string ) => void, onClick: () => void }) => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const { listData, fetchData, page, rowsPerPage } = useFetchData<ITask>(getTasks)
    useEffect(() => {
      if(isReload){
        fetchData(page, rowsPerPage)
      }
    }, [isReload])
    
    return(
        <Box p={2}>
            <ViewData
                label="Tiến độ công việc"
                onClick={onClick}
            />
            {md ? (
                <CardListPets tasks={listData} onHandle={onHandle}/>
            ) : (
                <TableListPets tasks={listData} onHandle={onHandle}/>
            )}
        </Box>
    )
}

export default TasksProcessInDashboard;
import dayjs from "dayjs";



import { BorderColorOutlined, DeleteOutline, VisibilityOutlined } from "@mui/icons-material";
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
import CustomPagination from "@/components/Pagination/CustomPagination";


const CardListPets = ({ tasks, onHandle, onChangePage, page, rowsPerPage, total } : { 
  tasks: ITask[], 
  onHandle: (id: string, type: string) => void, 
  onChangePage: (newPage: number) => void,
  page: number,
  rowsPerPage: number,
  total:  number  
}) => {
    return(
      <Box display='flex' gap={1} flexDirection='column'>
        {tasks.length === 0 && (
          <Box mt={2} display='flex' justifyContent='center'>
            <Typography variant='subtitle2'>Không tồn tại công việc nào</Typography>
          </Box>
        )}
        {tasks.slice(0,2).map((task, index) => (
          <CardData key={index}>
              <Box display='flex' justifyContent='space-between'>
                <Chip
                  label={getStatusTaskLabel(task.status)}
                  color={getStatusTaskColor(task.status).color}
                />
                <Typography variant='subtitle2'>{DateTime.FormatDateHour(task.hour)}</Typography>
              </Box>
              <Box my={1} display='flex' justifyContent='space-between'>
                <Typography variant="subtitle2" fontWeight={500}>Hạn chót</Typography>
                <Typography variant='subtitle2'>{DateTime.FormatDateHour(task.dueDate)}</Typography>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Typography my={2} variant='h6' fontWeight={600}>{index + 1}.{task.name}</Typography>
                <Stack mt={1}>
                  {task.status === 'pending' && (
                    <>
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
                    <Tooltip title="Xóa">
                      <IconButtonMui
                        onClick={(e: any) => {
                          e.stopPropagation();
                          onHandle(task.id, 'delete')
                        }}
                        
                        sx={{ borderRadius: '50%', backgroundColor: '#E1E3E4', width: 36, height: 36 }}
                      >
                          <DeleteOutline sx={{ color: COLORS.PRIMARY }} />
                      </IconButtonMui>
                    </Tooltip>
                    </>
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
        <Box mt={2} display='flex' justifyContent='center'>
          <CustomPagination
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            count={total}
          />
        </Box>
      </Box>  
    )
}

const TableListPets = ({ tasks, onHandle, onChangePage, page, rowsPerPage, total } : { 
  tasks: ITask[], 
  onHandle: (id: string, type: string) => void, 
  onChangePage: (newPage: number) => void,
  page: number,
  rowsPerPage: number,
  total:  number 
}) => {
    return (
      <>
        <Grid sx={{ mt: 1, bgcolor: '#fff', p: 1, borderRadius: 3 }} container spacing={2}>
          {['Công việc', 'Thú cưng', 'Trạng thái', 'Thời gian', 'Hạn chót', 'Thao tác'].map((header) => (
            <Grid key={header} sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant='subtitle2' fontWeight={500}>
                {header}
              </Typography>
            </Grid>
          ))}
        </Grid>
        {tasks.length === 0 && (
          <Box mt={2} display='flex' justifyContent='center'>
            <Typography variant='subtitle2'>Không tồn tại công việc nào</Typography>
          </Box>
        )}
        {tasks.map((task, index) => {
          const formatted = DateTime.FormatDateHour(task.hour);
          const hour = formatted?.includes('00:00 AM') ? formatted?.replace('00:00 AM', '12:00 AM') : formatted;
          
          return (
            <Grid
              key={index}
              sx={{ mt: 1, bgcolor: '#fff', p: 2, borderRadius: 3 }}
              container
              spacing={2}
            >
              <Grid sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant='subtitle2'>{index + 1}.{task.name}</Typography>
              </Grid>
              <Grid sx={{ flex: 1, textAlign: 'center' }}>
                <Box display='flex' flexDirection='row' justifyContent='center'>
                  {task.pets.slice(0, 3).map((pet, idx) => (
                    <Tooltip key={idx} title={pet.name}>
                      <Avatar src={pet.urlAvatar} sx={{ borderRadius: '50%' }} />
                    </Tooltip>
                  ))}
                  {task.pets.length - 3 > 0 && (
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
                  )}
                </Box>
              </Grid>
              <Grid sx={{ flex: 1, textAlign: 'center' }}>
                <Chip
                  label={getStatusTaskLabel(task.status)}
                  color={getStatusTaskColor(task.status).color}
                />
              </Grid>
              <Grid sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant='subtitle2'>{hour}</Typography>
              </Grid>
              <Grid sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant='subtitle2'>{DateTime.FormatDateHour(task.dueDate)}</Typography>
              </Grid>
              <Grid sx={{ flex: 1, textAlign: 'center' }}>
                {task.status === 'pending' && (
                  <>
                  <IconButton
                    tooltip='Chỉnh sửa'
                    handleFunt={() => onHandle(task.id, 'update')}
                    icon={<BorderColorOutlined sx={{ color: COLORS.PRIMARY }} />}
                    sx={{ boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.3)', mr: 1 }}
                  />
                  <IconButton
                    tooltip='Xóa'
                    handleFunt={() => onHandle(task.id, 'delete')}
                    icon={<DeleteOutline sx={{ color: COLORS.PRIMARY }} />}
                    sx={{ boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.3)', mr: 1 }}
                  />
                  </>
                )}
                <IconButton
                  tooltip='Xem chi tiết'
                  handleFunt={() => onHandle(task.id, 'view')}
                  icon={<VisibilityOutlined sx={{ color: COLORS.PRIMARY }} />}
                  sx={{ boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.3)' }}
                />
              </Grid>
            </Grid>
          ) 
        })}
        <Box mt={2} display='flex' justifyContent='center'>
          <CustomPagination
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            count={total}
          />
        </Box>
      </>
    );
}

const TasksProcessInDashboard = ({ isReload, onHandle, onClick }: { isReload: boolean, onHandle: (id: string, type: string ) => void, onClick: () => void }) => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const { listData, fetchData, page, rowsPerPage, handlePageChange, total, setPage  } = useFetchData<ITask>(getTasks, md ? 2 : 4)
    useEffect(() => {
      if(isReload){
        fetchData(1, rowsPerPage)
      }
    }, [isReload])

    useEffect(() => {
      setPage(1)
    }, [md])

    const handleChangePage = (newPage: number) => {
      handlePageChange(newPage)
    }
    
    return(
        <Box p={2}>
            <ViewData
                label="Tiến độ công việc"
                onClick={onClick}
                isShowViewMore={false}
            />
            {md ? (
                <CardListPets page={page} rowsPerPage={rowsPerPage} total={total} onChangePage={handleChangePage} tasks={listData} onHandle={onHandle}/>
            ) : (
                <TableListPets page={page} rowsPerPage={rowsPerPage} total={total} onChangePage={handleChangePage} tasks={listData} onHandle={onHandle}/>
            )}
        </Box>
    )
}

export default TasksProcessInDashboard;
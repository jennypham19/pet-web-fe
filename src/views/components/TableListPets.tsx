import IconButton from "@/components/IconButton/IconButton";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { COLORS } from "@/constants/colors";
import { ITask } from "@/types/task";
import DateTime from "@/utils/DateTime";
import { getStatusTaskColor, getStatusTaskLabel } from "@/utils/labelEntoVni";
import { BorderColorOutlined, DeleteOutline, VisibilityOutlined } from "@mui/icons-material";
import { Avatar, Box, Tooltip, Typography, IconButton as IconButtonMui, Chip } from "@mui/material";
import Grid from "@mui/material/Grid2"

interface TableListPetsProps {
  tasks: ITask[], 
  onHandle: (id: string, type: string) => void, 
  onChangePage: (newPage: number) => void,
  page: number,
  rowsPerPage: number,
  total:  number,
  isShowAction?: boolean
}

const TableListPets = (props: TableListPetsProps) => {
    const { tasks, onHandle, onChangePage, page, rowsPerPage, total, isShowAction=true } = props;
    return (
      <>
        <Grid sx={{ mt: 1, bgcolor: '#fff', p: 1, borderRadius: 3 }} container spacing={2}>
          {['Công việc', 'Thú cưng', 'Trạng thái', 'Thời gian', 'Hạn chót'].map((header) => (
            <Grid key={header} sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant='subtitle2' fontWeight={500}>
                {header}
              </Typography>
            </Grid>
          ))}
          {isShowAction && (
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant='subtitle2' fontWeight={500}>Thao tác</Typography>
            </Grid>
          )}
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
                        <Typography variant='subtitle2'>{task.displayName}</Typography>
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
                    {isShowAction && (
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
                    )}
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

export default TableListPets;
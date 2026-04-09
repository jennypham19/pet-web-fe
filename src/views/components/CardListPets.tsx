import { ITask } from "@/types/task";
import { Box, Chip, Stack, Tooltip, Typography, IconButton as IconButtonMui } from "@mui/material";
import CardData from "./CardData";
import { getStatusTaskColor, getStatusTaskLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import IconButton from "@/components/IconButton/IconButton";
import { BorderColorOutlined, DeleteOutline, VisibilityOutlined } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import PetsAvatar from "./PetsAvatar";
import CustomPagination from "@/components/Pagination/CustomPagination";

interface CardListPetsProps {
  tasks: ITask[], 
  onHandle: (id: string, type: string) => void, 
  onChangePage: (newPage: number) => void,
  page: number,
  rowsPerPage: number,
  total:  number,
  isShowAction?: boolean  
}

const CardListPets = (props: CardListPetsProps) => {
    const { tasks, onHandle, onChangePage, page, rowsPerPage, total, isShowAction = true } = props;
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
                        <Typography my={2} variant='h6' fontWeight={600}>{task.displayName}</Typography>
                        {isShowAction && (
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
                        )}
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

export default CardListPets;

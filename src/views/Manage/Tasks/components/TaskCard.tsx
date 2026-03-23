import { Box, Typography, Chip, Stack, IconButton, Tooltip } from "@mui/material";
import PetsAvatar from "@/views/components/PetsAvatar";
import { ITask } from "@/types/task";
import { getStatusTaskColor, getStatusTaskLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import { CameraAltOutlined, CheckCircleOutline, PlayCircleOutline, Visibility, VisibilityOutlined } from "@mui/icons-material";

const RenderButtonByStatus = ({task, handleButton} : { task: ITask, handleButton: (id: string, type: string) => void }) => {
    switch (task.status) {
        case 'completed':
            return(
                <Tooltip title="Xem chi tiết">
                    <IconButton onClick={() => handleButton(task.id, 'view')}>
                        <Visibility sx={{ color: '#000', width: 25, height: 25 }}/>
                    </IconButton>
                </Tooltip>
            )
        case 'in_progress':
            return(
                <Stack>
                    {task.isUpdatedImage && (
                        <Tooltip title="Hoàn thành">
                            <IconButton onClick={() => handleButton(task.id, 'completed')}>
                                <CheckCircleOutline sx={{ color: '#007AFF', width: 25, height: 25 }}/>
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Cập nhật">
                        <IconButton onClick={() => handleButton(task.id, 'updated')}>
                            <CameraAltOutlined sx={{ color: '#000', width: 25, height: 25 }}/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        case 'pending':
        default:
            return(
                <Tooltip title="Hoạt động">
                    <IconButton onClick={() => handleButton(task.id, 'start')}>
                        <PlayCircleOutline sx={{ color: '#FFCC00', width: 25, height: 25}}/>
                    </IconButton>
                </Tooltip>
            )
    }
}

const TaskCard = ({ task, handleButton}: { task: ITask, handleButton: (id: string, type: string) => void }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        mb: { xs: 0, md: 2 },
      }}
    >
        <Box display='flex' justifyContent='space-between'>
            <Typography variant="caption">Công việc</Typography>
            <Tooltip title="Xem chi tiết">
                <IconButton onClick={() => handleButton(task.id, 'view')}>
                    <VisibilityOutlined/>
                </IconButton>
            </Tooltip>
        </Box>
        <Typography fontWeight={600} mb={1}>
            {task.name}
        </Typography>

        <Box display='flex' justifyContent='space-between'>
            <Stack direction='column'>
                <Typography fontSize={13} color="gray">
                    Thời gian bắt đầu
                </Typography>  
                <Typography fontWeight={500}>
                    {DateTime.FormatHour(task.hour)}
                </Typography>                              
            </Stack>
            <PetsAvatar pets={task.pets} height={32} width={32}/>            
        </Box>
        <Box mt={1} display='flex' justifyContent='space-between'>
            <Chip
                label={getStatusTaskLabel(task.status)}
                color={getStatusTaskColor(task.status).color}
            />
            <RenderButtonByStatus
                task={task}
                handleButton={handleButton}
            />
        </Box>
    </Box>
  );
};

export default TaskCard;
import IconButton from "@/components/IconButton/IconButton"
import Page from "@/components/Page"
import { COLORS } from "@/constants/colors"
import { useFetchData } from "@/hooks/useFetchData"
import { getTasks, updateStatus } from "@/services/task-service"
import { ITask } from "@/types/task"
import SearchBox from "@/views/components/SearchBox"
import { FilterAlt, Notifications } from "@mui/icons-material"
import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import Grid from "@mui/material/Grid2";
import TaskCard from "./components/TaskCard"
import useNotification from "@/hooks/useNotification"
import { useState } from "react"

const ManagementTasks = () => {
    const notify = useNotification();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const { listData, searchTerm, handleSearch, fetchData, page, rowsPerPage } = useFetchData<ITask>(getTasks)
    const queryData = md ? listData.slice(0,1) : listData.slice(0,4);

    const groupTasks = (tasks: ITask[]) => {
        return {
            pending: tasks.filter(t => t.status === 'pending'),
            in_progress: tasks.filter(t => t.status === 'in_progress'),
            completed: tasks.filter(t => t.status === 'completed'),
        };
    };

    const Column = ({ tasks, handleButton }: { tasks: ITask[], handleButton: (id: string, type: string) => void }) => {
        return (
            <Box flex={1}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} handleButton={handleButton} />
                ))}
            </Box>
        );
    };

    const grouped = groupTasks(queryData);
    const handleButton = async(id: string, type: string) => {{
        console.log("id: ", id);
        console.log("type: ", type);
        let res: any;
        setIsSubmitting(true);
        try {
            switch (type) {
                case 'completed':
                    
                    break;
                case 'start':
                default:
                    const payload: { status: string} = {
                        status: 'in_progress'
                    }
                    res = await updateStatus(id, payload);
            }
            notify({
                message: res.message,
                severity: 'success'
            })
            fetchData(page, rowsPerPage)
        } catch (error: any) {
            notify({
                message: error.messgae,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }

    }}
    return(
        <Page title="Quản lý công việc">
            <Box p={1} bgcolor='#fff'>
                <SearchBox
                    initialValue={searchTerm}
                    onSearch={handleSearch}
                    detailPanel={
                        <>
                            <IconButton
                                tooltip='Thông báo'
                                handleFunt={() => {}}
                                icon={<Notifications sx={{ color: '#fff' }} />}
                                backgroundColor={COLORS.PRIMARY}
                            />
                            <IconButton
                                tooltip='Bộ lọc'
                                handleFunt={() => {}}
                                icon={<FilterAlt sx={{ color: '#fff' }} />}
                                backgroundColor={COLORS.PRIMARY}
                            />
                        </>
                    }
                >
                </SearchBox>
            </Box>
            <Typography variant="h6" fontWeight={500} m={2}>Tiến trình công việc</Typography>
            <Grid container spacing={md ? 1 : 0}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ bgcolor: '#FFE9E9', p: 2, borderRadius: 2, mx: 1.5 }}>
                        <Column
                            tasks={grouped.pending}
                            handleButton={handleButton}
                        />
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ bgcolor: '#FFFBE9', p: 2, borderRadius: 2, mx: 1.5 }}>
                        <Column
                            tasks={grouped.in_progress}
                            handleButton={handleButton}
                        />
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ bgcolor: '#E9FFEC', p: 2, borderRadius: 2, mx: 1.5 }}>
                        <Column
                            tasks={grouped.completed}
                            handleButton={handleButton}
                        />
                    </Paper>
                </Grid>
            </Grid>       
        </Page>
    )
}

export default ManagementTasks
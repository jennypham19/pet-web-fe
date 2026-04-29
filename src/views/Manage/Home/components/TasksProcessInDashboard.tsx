import { Box, useMediaQuery, useTheme } from "@mui/material";
import { getTasksForSpecialist } from "@/services/task-service";
import { ITask } from "@/types/task";
import ViewData from "@/views/components/ViewData";
import { useEffect } from "react";
import CardListPets from "@/views/components/CardListPets";
import TableListPets from "@/views/components/TableListPets";
import { useFetchTaskByDate } from "@/hooks/useFetchTaskByDate";

const TasksProcessInDashboard = ({ isReload, onHandle, onClick, date }: { isReload: boolean, onHandle: (id: string, type: string ) => void, onClick: () => void, date: any }) => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const { listData, fetchData, page, rowsPerPage, handlePageChange, total, setPage  } = useFetchTaskByDate<ITask>(getTasksForSpecialist, md ? 2 : 5, date)
    useEffect(() => {
      if(isReload){
        fetchData(1, rowsPerPage, date)
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
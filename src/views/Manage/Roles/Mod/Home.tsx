import { useState } from "react";



import { Add, FilterAlt, Notifications } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import SearchBox from "../../../components/SearchBox";
import ListPetsInDashboard from "../../Home/components/ListPetsInDashboard";
import TasksProcessInDashboard from "../../Home/components/TasksProcessInDashboard";
import CreateTask from "../../Tasks/components/CreateTask";
import IconButton from "@/components/IconButton/IconButton";



import { COLORS } from "@/constants/colors";
import { useNavigate } from "react-router-dom";


const DashboardInMod = () => {
    const navigate = useNavigate();
    const [openTask, setOpenTask] = useState<{ open: boolean, type: string }>({ open: false, type: '' });
    const [isReload, setIsReload] = useState(false);
    const handleCloseOpenTask = () => {
        setIsReload(true);
        setOpenTask({ open: false, type: 'add' });
    }
    return (
      <Box>
        <Box p={1} bgcolor='#fff'>
          <SearchBox
            initialValue=''
            onSearch={() => {}}
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
            <Button
              onClick={() => {
                setOpenTask({ open: true, type: 'add' });
              }}
              variant='contained'
              sx={{ bgcolor: COLORS.PRIMARY, borderRadius: 2, px: 1.5, py: 1, fontWeight: 500 }}
              endIcon={<Add />}
            >
              Tạo công việc
            </Button>
          </SearchBox>
        </Box>
        <ListPetsInDashboard onClick={() => { navigate('/pet/manage/pet')}} onDetailPet={() => {}}/>
        <TasksProcessInDashboard isReload={isReload}/>
        {openTask.open && openTask.type === 'add' && (
          <CreateTask open={openTask.open} onClose={handleCloseOpenTask} />
        )}
      </Box>
    );
}

export default DashboardInMod;
import { useState } from "react";
import { Add, FilterAlt, Notifications, Update } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import SearchBox from "../../../components/SearchBox";
import ListPetsInDashboard from "../../Home/components/ListPetsInDashboard";
import TasksProcessInDashboard from "../../Home/components/TasksProcessInDashboard";
import CreateTask from "../../Tasks/components/CreateTask";
import IconButton from "@/components/IconButton/IconButton";
import { COLORS } from "@/constants/colors";
import { useNavigate } from "react-router-dom";
import DialogConfirm from "@/views/components/DialogConfirm";
import img from "@/assets/images/users/img_2.jpg"
import ViewTask from "../../Tasks/components/ViewTask";
import UpdateTask from "../../Tasks/components/UpdateTask";


const DashboardInMod = () => {
    const navigate = useNavigate();
    const [openTask, setOpenTask] = useState<{ open: boolean, type: string }>({ open: false, type: '' });
    const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [id, setId] = useState<string | null>(null)
    const handleCloseOpenTask = () => {
        // setIsReload(true);
        setOpenDialogConfirm(true)
        setOpenTask({ open: false, type: 'add' });
    }

    const handleCloseDialogConfirm = () => {
      setOpenDialogConfirm(false);
      setIsReload(true)
    }

    const handleButton = (id: string, type: string) => {
      setId(id);
      switch (type) {
        case 'update':
          setOpenTask({ open: true, type: 'update'})
          break;
        case 'view':
          setOpenTask({ open: true, type: 'view'})
          break;
        default:
          break;
      }
    }

    const handleCloseButton = (type: string) => {
      switch (type) {
        case 'update':
          setOpenTask({ open: false, type: 'update'})
          break;
        case 'view':
          setOpenTask({ open: false, type: 'view'})
          break;
        default:
          break;
      }
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
        <TasksProcessInDashboard isReload={isReload} onHandle={handleButton}/>
        {openTask.open && openTask.type === 'add' && (
          <CreateTask open={openTask.open} onClose={handleCloseOpenTask} />
        )}
        {openDialogConfirm && (
          <DialogConfirm
            open={openDialogConfirm}
            label="Trang chủ"
            onClose={handleCloseDialogConfirm}
            title="Chúc mừng bạn đã tạo thành công một công việc mới!"
            image={img}
          />
        )}
        {openTask.open && openTask.type === 'view' && id && (
          <ViewTask
            open={openTask.open}
            onClose={() => handleCloseButton('view')}
            id={id}
          />
        )}
        {openTask.open && openTask.type === 'update' && id && (
          <UpdateTask
            open={openTask.open}
            onClose={() => handleCloseButton('update')}
            id={id}
          />
        )}
      </Box>
    );
}

export default DashboardInMod;
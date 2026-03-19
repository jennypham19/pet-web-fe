import { Box, Button } from "@mui/material";
import SearchBox from "../../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, FilterAlt, Notifications,  } from "@mui/icons-material";
import IconButton from "@/components/IconButton/IconButton";
import ListPetsInDashboard from "../../Home/components/ListPetsInDashboard";
import TasksProcessInDashboard from "../../Home/components/TasksProcessInDashboard";
import { useState } from "react";
import CreateTask from "../../Home/components/CreateTask";

const DashboardInMod = () => {
    const [openTask, setOpenTask] = useState<{ open: boolean, type: string }>({ open: false, type: '' });
    return(
        <Box>
            <Box p={1} bgcolor='#fff'>
                <SearchBox
                    initialValue=""
                    onSearch={() => {}}
                    detailPanel={(
                        <>
                            <IconButton
                                tooltip="Thông báo"
                                handleFunt={() => {}}
                                icon={<Notifications sx={{ color: '#fff'}}/>}
                                backgroundColor={COLORS.PRIMARY}
                            />
                            <IconButton
                                tooltip="Bộ lọc"
                                handleFunt={() => {}}
                                icon={<FilterAlt sx={{ color: '#fff'}}/>}
                                backgroundColor={COLORS.PRIMARY}
                            />
                        </>
                    )}
                >
                    <Button
                        onClick={() => { setOpenTask({ open: true, type: 'add' })}}
                        variant="contained"
                        sx={{ bgcolor: COLORS.PRIMARY, borderRadius: 2, px: 1.5, py: 1, fontWeight: 500 }}
                        endIcon={<Add/>}
                    >
                        Tạo công việc
                    </Button>
                </SearchBox>
            </Box>
            <ListPetsInDashboard/>
            <TasksProcessInDashboard/>
            {openTask.open && openTask.type === 'add' && (
                <CreateTask
                    open={openTask.open}
                    onClose={() => { setOpenTask({ open: false, type: 'add' }) }}
                />
            )}
        </Box>
    )
}

export default DashboardInMod;
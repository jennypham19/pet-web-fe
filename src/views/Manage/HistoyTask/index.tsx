import Page from "@/components/Page";
import { useFetchData } from "@/hooks/useFetchData";
import { getTasks, getTotalTaskAndStaff, TotalData } from "@/services/task-service";
import { ITask } from "@/types/task";
import CardData from "@/views/components/CardData";
import CardListPets from "@/views/components/CardListPets";
import TableListPets from "@/views/components/TableListPets";
import { Box, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

const ManageHistoryTask = () => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const { listData, fetchData, page, rowsPerPage, handlePageChange, total, setPage  } = useFetchData<ITask>(getTasks, md ? 2 : 10)
    const [totalTaskAndStaff, setTotalTaskAndStaff] = useState<TotalData | null>(null)
    
    useEffect(() => {
      setPage(1)
    }, [md])

    useEffect(() => {
        const getTotal = async() => {
            const res = await getTotalTaskAndStaff();
            const data = res.data as any as TotalData;
            setTotalTaskAndStaff(data)
        }
        getTotal()
    }, [listData]);
    
    return(
        <Page title="Quản lý lịch sử công việc">
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CardData>
                            <Typography fontWeight={600} variant="subtitle2">TỔNG CÔNG VIỆC</Typography>
                            <Typography fontWeight={600} variant="h4">{totalTaskAndStaff?.totalTask}</Typography>
                        </CardData>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CardData>
                            <Typography fontWeight={600} variant="subtitle2">CÔNG VIỆC NGÀY HÔM NAY</Typography>
                            <Typography fontWeight={600} variant="h4">{totalTaskAndStaff?.todayTask}/{totalTaskAndStaff?.totalTask}</Typography>
                        </CardData>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CardData>
                            <Typography fontWeight={600} variant="subtitle2">TỔNG NHÂN SỰ (CHUYÊN VIÊN + NHÂN VIÊN)</Typography>
                            <Stack>
                                <Typography fontWeight={600} variant="h4">{totalTaskAndStaff?.totalStaff}</Typography>
                                <Typography fontWeight={600} variant="subtitle2" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>đang hoạt động</Typography>
                            </Stack>
                        </CardData>
                    </Grid>
                </Grid>
                <Paper sx={{ p: 1.5, my: 2, borderRadius: 5 }}>
                    <Typography fontWeight={600} variant="h5">Tiến độ công việc</Typography>   
                </Paper>
                
                {md ? (
                    <CardListPets
                        page={page}
                        rowsPerPage={rowsPerPage}
                        tasks={listData}
                        total={total}
                        onChangePage={handlePageChange}
                        onHandle={() => {}}
                        isShowAction={false}
                    />
                ) : (
                    <TableListPets
                        page={page}
                        rowsPerPage={rowsPerPage}
                        tasks={listData}
                        total={total}
                        onChangePage={handlePageChange}
                        onHandle={() => {}}
                        isShowAction={false}
                    />
                )}                
            </Box>
            
        </Page>
    )
}

export default ManageHistoryTask;
import IconButton from "@/components/IconButton/IconButton";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import { IUser } from "@/types/user";
import { getActiveAccountColor, getActiveLabel, getRoleLabel, getStatusTaskColor } from "@/utils/labelEntoVni";
import { Password, ToggleOff, ToggleOn } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface TableListAccountsProps{
    users: IUser[],
    onHandle: (id: string, isActived: number) => void, 
    onChangePage: (newPage: number) => void,
    page: number,
    rowsPerPage: number,
    total:  number
}

const TableListAccounts = (props: TableListAccountsProps) => {
    const { users, onHandle, onChangePage, page, rowsPerPage, total } = props;
    const start = total === 0 ? 0 : (page - 1) * rowsPerPage + 1;
    const end = start + users.length - 1;
    return(
        <>
            <Grid sx={{ mt: 1, bgcolor: '#d4d4d4', p: 1, borderRadius: 3 }} container spacing={2}>
                {['Nhân viên', 'Họ và tên', 'Chức vụ', 'Phòng ban', 'Trạng thái', 'Thao tác'].map((header) => (
                    <Grid key={header} sx={{ flex: 1, textAlign: 'center', p: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>{header.toUpperCase()}</Typography>
                    </Grid>
                ))}
            </Grid>  
            {users.length === 0 && (
                    <Box mt={2} display='flex' justifyContent='center'>
                        <Typography variant='subtitle2'>Không tồn tại tài khoản nào</Typography>
                    </Box>
            )}
            {users.map((user, index) => {
                const department = (user.role === ROLE.ADMIN || user.role === ROLE.MOD) ? "Ban quản lý nhân sự" : "Ban quản lý và chăm sóc thú cưng"
                return(
                    <Grid key={user.id} container>
                        <Grid sx={{ flex: 1, textAlign: 'center', p: 2, borderBottom: users.length - 1 > index ? '1px solid' : 'none' }}>
                            <Avatar
                                src={user.avatarUrl}
                                sx={{ borderRadius: '50%', width: 40, height: 40 }}
                            />
                        </Grid>
                        <Grid sx={{ flex: 1, textAlign: 'center', p: 2, borderBottom: users.length - 1 > index ? '1px solid' : 'none' }}>
                            <Typography variant="subtitle2">{user.name}</Typography>
                        </Grid>
                        <Grid sx={{ flex: 1, textAlign: 'center', p: 2, borderBottom: users.length - 1 > index ? '1px solid' : 'none' }}>
                            <Typography variant="subtitle2">{getRoleLabel(user.role)}</Typography>
                        </Grid>
                        <Grid sx={{ flex: 1, textAlign: 'center', p: 2, borderBottom: users.length - 1 > index ? '1px solid' : 'none' }}>
                            <Typography variant="subtitle2">{department}</Typography>
                        </Grid>
                        <Grid sx={{ flex: 1, textAlign: 'center', p: 2, borderBottom: users.length - 1 > index ? '1px solid' : 'none' }}>
                            <Chip
                                label={getActiveLabel(user.isActived)}
                                color={getActiveAccountColor(user.isActived).color}
                            />
                        </Grid>
                        <Grid sx={{ flex: 1, textAlign: 'center', p: 2, borderBottom: users.length - 1 > index ? '1px solid' : 'none' }}>
                            <IconButton
                                tooltip={user.isActived === 1 ? "Vô hiệu hóa" : 'Kích hoạt'}
                                icon={user.isActived === 1 ? <ToggleOff color="error"/> : <ToggleOn color="success"/>}
                                handleFunt={() => onHandle(user.id, user.isActived)}
                            />
                            <IconButton
                                tooltip="Reset mật khẩu"
                                icon={<Password/>}
                                handleFunt={() => {}}
                            />
                        </Grid>
                    </Grid>
                )
            })}
            <Grid sx={{ mt: 1, bgcolor: '#d4d4d4', borderRadius: 3 }} container spacing={2}>
                <Grid sx={{ flex: 1, display: 'flex', textAlign: 'center', p: 1, px: 1.5, justifyContent: 'space-between' }}>
                    <Typography sx={{ margin: 'auto 0'}} variant="subtitle2">Hiện thị {start} - {end} của {total} nhân sự</Typography>
                    <CustomPagination
                        page={page}
                        count={total}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                    />
                </Grid>
            </Grid> 
        </>
    )
}

export default TableListAccounts;
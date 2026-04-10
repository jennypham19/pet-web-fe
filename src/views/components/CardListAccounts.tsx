import { IUser } from "@/types/user";
import { Avatar, Box, Button, Chip, Typography } from "@mui/material";
import CardData from "./CardData";
import { ROLE } from "@/constants/roles";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { getActiveAccountColor, getActiveLabel, getRoleLabel } from "@/utils/labelEntoVni";

interface CardListAccountsProps{
    users: IUser[],
    onHandle: (id: string, isActive: number) => void, 
    onChangePage: (newPage: number) => void,
    page: number,
    rowsPerPage: number,
    total:  number,
}

const CardListAccounts = (props: CardListAccountsProps) => {
    const { users, onChangePage, onHandle, page, rowsPerPage, total } = props;
    return(
        <Box display='flex' gap={1} flexDirection='column'>
            {users.length === 0 && (
                <Box mt={2} display='flex' justifyContent='center'>
                    <Typography variant='subtitle2'>Không tồn tại tài khoản nào</Typography>
                </Box>
            )}
            {users.map((user, index) => {
                const department = (user.role === ROLE.ADMIN || user.role === ROLE.MOD) ? "Ban quản lý nhân sự" : "Ban quản lý và chăm sóc thú cưng"
                return (
                    <CardData>
                        <Box display='flex' justifyContent='space-between'>
                            <Box display='flex' gap={2}>
                                <Avatar
                                    src={user.avatarUrl}
                                    sx={{ borderRadius: '50%', width: 40, height: 40 }}
                                />
                                <Typography sx={{ margin: 'auto 0'}} variant="subtitle2">{user.name}</Typography>
                            </Box>
                            <Chip
                                sx={{ margin: "auto 0"}}
                                label={getActiveLabel(user.isActived)}
                                color={getActiveAccountColor(user.isActived).color}
                            />
                        </Box>
                        <Box mt={1.5} display='flex' gap={2}>
                            <Typography variant="subtitle2">Chức vụ:</Typography>
                            <Typography variant="subtitle2">{getRoleLabel(user.role)}</Typography>
                        </Box>
                        <Box mt={1.5} display='flex' gap={2}>
                            <Typography variant="subtitle2">Phòng ban:</Typography>
                            <Typography variant="subtitle2">{department}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between' gap={2}>
                            <Button
                                sx={{ mt: 1.5, borderRadius: 2, bgcolor: user.isActived === 1 ? '#d32020' : '#196e35' }}
                                fullWidth
                                onClick={() => onHandle(user.id, user.isActived)}
                            >
                                {user.isActived === 1 ? "Vô hiệu hóa" : 'Kích hoạt'}
                            </Button> 
                            <Button
                                sx={{ mt: 1.5, borderRadius: 2, bgcolor: '#969494' }}
                                fullWidth
                                onClick={() => {}}
                            >
                                Reset
                            </Button>
                        </Box>

                    </CardData>
                )
            })}
            <Box mt={2} display='flex' justifyContent='space-between'>
                <Typography sx={{ margin: 'auto 0'}} variant="caption">Hiện thị 2 của {total} nhân sự</Typography>
                <CustomPagination
                    page={page}
                    count={total}
                    onPageChange={onChangePage}
                    rowsPerPage={rowsPerPage}
                />
            </Box> 
        </Box>
    )
}

export default CardListAccounts;
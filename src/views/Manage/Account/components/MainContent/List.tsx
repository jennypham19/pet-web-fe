import Backdrop from "@/components/Backdrop";
import { useFetchData } from "@/hooks/useFetchData";
import useNotification from "@/hooks/useNotification";
import { activateAccount, disableAccount, getListAccounts } from "@/services/user-service";
import { IUser } from "@/types/user";
import CardListAccounts from "@/views/components/CardListAccounts";
import TableListAccounts from "@/views/components/TableListAccounts";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface ListAccountsContentProps{

}

const ListAccountsContent = (props: ListAccountsContentProps) => {
    const { } = props;
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const notify = useNotification();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { searchTerm, listData, fetchData, page, rowsPerPage, handlePageChange, handleSearch, total, setPage } = useFetchData<IUser>(getListAccounts, md ? 2 : 5)
    
    useEffect(() => {
        setPage(1)
    }, [md]);

    // kích hoạt tài khoản
    const handleActived = async(id: string) => {
        setIsSubmitting(true)
        try {
            const res = await activateAccount(id);
            notify({ message: res.message, severity: 'success' });
            fetchData(1, md ? 2 : 5)
        } catch (error: any) {
            notify({ message: error.message, severity: 'error'})
        } finally {
            setIsSubmitting(false)
        }
    }

    // vô hiệu hóa tài khoản
    const handleUnActived = async(id: string) => {
        setIsSubmitting(true)
        try {
            const res = await disableAccount(id);
            notify({ message: res.message, severity: 'success' });
            fetchData(1, md ? 2 : 5)
        } catch (error: any) {
            notify({ message: error.message, severity: 'error'})
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleIconButton = (id: string, isActive: number) => {
        switch (isActive) {
            case -1:
                handleActived(id)
                break;
            case 1:
            default:
                handleUnActived(id)
                break;
        }
    }
    return(
        <Box>
            {md ? (
                <CardListAccounts total={total} users={listData} page={page} rowsPerPage={rowsPerPage} onChangePage={handlePageChange} onHandle={handleIconButton}/>
            ) : (
                <TableListAccounts total={total} users={listData} page={page} rowsPerPage={rowsPerPage} onChangePage={handlePageChange} onHandle={handleIconButton}/>
            )}

            {isSubmitting && (<Backdrop open={isSubmitting} />)}
        </Box>
    )
}

export default ListAccountsContent
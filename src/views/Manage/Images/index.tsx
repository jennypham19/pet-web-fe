import CommonImage from "@/components/Image/index"
import Page from "@/components/Page"
import CustomPagination from "@/components/Pagination/CustomPagination"
import { COLORS } from "@/constants/colors"
import { useFetchData } from "@/hooks/useFetchData"
import { getPetImages } from "@/services/pet-service"
import { IImagesPet } from "@/types/pet"
import { CameraAlt } from "@mui/icons-material"
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useEffect, useState } from "react"
import DialogUploadImages from "./components/DialogUploadImages"

const ManagementImage = () => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const pageSize = md ? 2 : 6;
    const { listData, page, rowsPerPage, handlePageChange, total, fetchData, setPage } = useFetchData<IImagesPet>(getPetImages, pageSize);
    const [openDialog, setOpenDialog] = useState<{ open: boolean, type: string}>({ open: false, type: '' });

    useEffect(() => {
      setPage(1)
    }, [md])

    const handleOpenAddImage = () => {
        setOpenDialog({ open: true, type: 'add' });
    }

    const handleCloseAddImage = () => {
        setOpenDialog({ open: false, type: 'add' });
        fetchData(1, pageSize)
    }
    return(
        <Page title="Cập nhật hình ảnh">
            <Box mx={2} p={1}>
                <Typography pb={1} fontWeight={600} variant='h6'>Hình ảnh thú cưng</Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Box 
                            sx={{ 
                                px: 2, width: { xs: '100%', lg: 350 }, height: 250, 
                                border: '1px dashed #a3a0a0', 
                                borderRadius: 2, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                textAlign: 'center' 
                            }}
                        >
                            <Box sx={{ margin: 'auto 0' }}>
                                <CameraAlt sx={{ fontSize: 48, color: 'text.secondary' }} />
                                <Typography fontSize='13px'>{`Hình ảnh trực tiếp dưới dạng PNG, JPG....`}</Typography>
                                <Button
                                    onClick={handleOpenAddImage}
                                    sx={{ mt: 1, bgcolor: COLORS.PRIMARY }}
                                    disabled={!md}
                                >
                                    Thêm hình ảnh
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    

                    {listData.length === 0 ? (
                        <Typography>Không tồn tại bản ghi nào cả.</Typography>
                    ): (
                        listData.map((img) => (
                            <Grid key={img.id} size={{ xs: 12, sm: 4, md: 3 }}>
                                <CommonImage
                                    src={img.urlImage}
                                    alt={img.nameImage}
                                    sx={{ width:{ xs: '100%', lg: 350 }, height: 250, borderRadius: 2 }}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
                <Box mt={2} display='flex' justifyContent='center'>
                    <CustomPagination
                        page={page}
                        rowsPerPage={rowsPerPage}
                        count={total}
                        onPageChange={handlePageChange}
                    />
                </Box>
            </Box>
            {openDialog.open && openDialog.type === 'add' && (
                <DialogUploadImages
                    open={openDialog.open}
                    onClose={handleCloseAddImage}
                />
            )}
        </Page>
    )
}

export default ManagementImage
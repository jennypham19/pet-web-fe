import { useState } from "react";



import { Add, FilterAlt, Notifications } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import IconButton from "@/components/IconButton/IconButton";
import Page from "@/components/Page";



import { COLORS } from "@/constants/colors";
import SearchBox from "@/views/components/SearchBox";
import CreateProfilePet from "./components/CreateProfilePet";
import ListPetsInDashboard from "../Home/components/ListPetsInDashboard";
import ListPets from "./ListPets";
import DetailPet from "./components/DetailPet";
import { useFetchData } from "@/hooks/useFetchData";
import { IPet } from "@/types/pet";
import { getPets } from "@/services/pet-service";


const ManagementPets = () => {
    const [openProfilePet, setOpenProfilePet] = useState<{ open: boolean, type: string}>({ open: false, type: '' });
    const [openListPets, setOpenListPets] = useState(false);
    const [id, setId] = useState<string | null>(null); 
    const { listData, page, rowsPerPage, handlePageChange, total, fetchData } = useFetchData<IPet>(getPets, 8);
    
    // Tạo hồ sơ
    const handleOpenCreateProfilePet = () => {
        setOpenProfilePet({ open: true, type: 'create' });
    };

    const handleCloseCreateProfilePet = () => {
        setOpenProfilePet({ open: false, type: 'create' });
        fetchData(page, rowsPerPage)
    };

    // Xem chi tiết
    const handleOpenViewProfilePet = (id: string) => {
        setId(id)
        setOpenProfilePet({ open: true, type: 'view' });
    };

    const handleCloseViewProfilePet = () => {
        setId(null)
        setOpenProfilePet({ open: false, type: 'view' });
    };

    return (
        <Page title='Danh sách thú cưng'>
            {(!openProfilePet.open && !openListPets) && (
                <>
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
                                onClick={handleOpenCreateProfilePet}
                                variant='contained'
                                sx={{ bgcolor: COLORS.PRIMARY, borderRadius: 2, px: 1.5, py: 1, fontWeight: 500 }}
                                endIcon={<Add />}
                            >
                                Tạo hồ sơ
                            </Button>
                        </SearchBox>
                    </Box>
                    <ListPetsInDashboard
                        onClick={() => { setOpenListPets(true) }}
                        onDetailPet={handleOpenViewProfilePet}
                        listData={listData}
                    />                    
                </>    
            )}
            {openProfilePet.open && openProfilePet.type === 'create' && (
                <CreateProfilePet
                    onClose={handleCloseCreateProfilePet}
                />
            )}
            {openListPets && (
                <ListPets
                    listData={listData}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    total={total}
                    onPageChange={handlePageChange}
                    onBack={() => { setOpenListPets(false) }}
                />
            )}

            {openProfilePet.open && openProfilePet.type === 'view' && id && (
                <DetailPet
                    onBack={handleCloseViewProfilePet}
                    id={id}
                />
            )}
        </Page>
    );
}

export default ManagementPets
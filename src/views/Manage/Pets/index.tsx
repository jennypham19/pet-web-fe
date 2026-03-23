import { useState } from "react";



import { Add, FilterAlt, Notifications } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import IconButton from "@/components/IconButton/IconButton";
import Page from "@/components/Page";



import { COLORS } from "@/constants/colors";
import SearchBox from "@/views/components/SearchBox";
import CreateProfilePet from "./components/CreateProfilePet";


const ManagementPets = () => {
    const [openCreateProfilePet, setOpenCreateProfilePet] = useState<{ open: boolean, type: string}>({ open: false, type: '' }) 
    
    const handleOpenCreateProfilePet = () => {
      setOpenCreateProfilePet({ open: true, type: 'create' });
    };

    const handleCloseCreateProfilePet = () => {
      setOpenCreateProfilePet({ open: false, type: 'create' });
    };

    return (
        <Page title='Danh sách thú cưng'>
            {!openCreateProfilePet.open && (
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
            )}
            {openCreateProfilePet.open && openCreateProfilePet.type === 'create' && (
                <CreateProfilePet
                    onClose={handleCloseCreateProfilePet}
                />
            )}
        </Page>
    );
}

export default ManagementPets
import ViewPetDesktop from "@/layouts/Breakpoint/Desktop/ViewPetDesktop";
import ViewPetMobile from "@/layouts/Breakpoint/Mobile/ViewPetMobile";
import { getPet } from "@/services/pet-service";
import { IPet } from "@/types/pet";
import NavigateBack from "@/views/components/NavigateBack";
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import Vaccination from "./Vaccination";
import Deworming from "./Deworming";
import RegularVetCheckup from "./RegularVetCheckup";

interface DetailPetProps{
    onBack: () => void;
    id: string
}

const DetailPet = (props: DetailPetProps) => {
    const { onBack, id } = props;
    const [pet, setPet] = useState<IPet | null>(null);
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState<{ open: boolean, type: string }>({ open: false, type: '' });

    const getDetailPet = async() => {
        const res = await getPet(id);    
        const data = res.data as any as IPet;        
        setPet(data);
    };

    useEffect(() => {
        if(id){
            getDetailPet()
        }
    }, [id])

    // Vaccination
    const handleOpenVaccination = (type: string) => {
        setOpen({ open: true, type: type });
    }

    const handleCloseVaccination = () => {
        setOpen({ open: false, type: 'vaccination' });
        getDetailPet()
    }

    // Deworming
    const handleOpenDeworming = (type: string) => {
        setOpen({ open: true, type: type });
    }

    const handleCloseDeworming = () => {
        setOpen({ open: false, type: 'deworming' });
        getDetailPet()
    }

    // RegularVetCheckup
    const handleOpenRegularVetCheckup = (type: string) => {
        setOpen({ open: true, type: type });
    }

    const handleCloseRegularVetCheckup = () => {
        setOpen({ open: false, type: 'regularVetCheckup' });
        getDetailPet()
    }   


    return(
        <Box>
            {!open.open && (
                <>
                    <NavigateBack
                        sx={{  p: 1, bgcolor: '#fff' }}
                        title="Xem chi tiết thông tin thú cưng"
                        onBack={onBack}
                    />
                    {pet && (
                        md ? (
                            <ViewPetMobile 
                                pet={pet}
                                onOpenDeworming={handleOpenDeworming}
                                onOpenRegularVetCheckup={handleOpenRegularVetCheckup}
                                onOpenVaccination={handleOpenVaccination}
                            />
                        ) : (
                            <ViewPetDesktop 
                                pet={pet}
                                onOpenDeworming={handleOpenDeworming}
                                onOpenRegularVetCheckup={handleOpenRegularVetCheckup}
                                onOpenVaccination={handleOpenVaccination}
                            />
                        )
                    )}                
                </>
            )}
            {open.open && open.type === 'vaccination' && id && (
                <Vaccination
                    onBack={handleCloseVaccination}
                    id={id}
                />
            )}  
            {open.open && open.type === 'deworming' && id && (
                <Deworming
                    onBack={handleCloseDeworming}
                    id={id}
                />
            )}  
            {open.open && open.type === 'regularVetCheckup' && id && (
                <RegularVetCheckup
                    onBack={handleCloseRegularVetCheckup}
                    id={id}
                />
            )}    
        </Box>
    )
}

export default DetailPet;
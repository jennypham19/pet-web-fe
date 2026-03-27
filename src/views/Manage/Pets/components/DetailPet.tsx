import ViewPetDesktop from "@/layouts/Breakpoint/Desktop/ViewPetDesktop";
import ViewPetMobile from "@/layouts/Breakpoint/Mobile/ViewPetMobile";
import { getPet } from "@/services/pet-service";
import { IPet } from "@/types/pet";
import NavigateBack from "@/views/components/NavigateBack";
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react";

interface DetailPetProps{
    onBack: () => void;
    id: string
}

const DetailPet = (props: DetailPetProps) => {
    const { onBack, id } = props;
    const [pet, setPet] = useState<IPet | null>(null);
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    useEffect(() => {
        if(id){
            const getDetailPet = async() => {
                const res = await getPet(id);
                const data = res.data as any as IPet;
                setPet(data);
            };
            getDetailPet()
        }
    }, [id])
    return(
        <Box>
            <NavigateBack
                sx={{  p: 1, bgcolor: '#fff' }}
                title="Xem chi tiết thông tin thú cưng"
                onBack={onBack}
            />
            {pet && (
                md ? (
                    <ViewPetMobile pet={pet}/>
                ) : (
                    <ViewPetDesktop pet={pet}/>
                )
            )}
        </Box>
    )
}

export default DetailPet;
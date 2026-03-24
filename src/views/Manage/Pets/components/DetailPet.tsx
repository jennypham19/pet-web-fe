import NavigateBack from "@/views/components/NavigateBack";
import { Box } from "@mui/material"

interface DetailPetProps{
    onBack: () => void;
}

const DetailPet = (props: DetailPetProps) => {
    const { onBack } = props;
    return(
        <Box>
            <NavigateBack
                sx={{  p: 1, bgcolor: '#fff' }}
                title="Xem chi tiết thông tin thú cưng"
                onBack={onBack}
            />
        </Box>
    )
}

export default DetailPet;
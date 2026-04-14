import CommonImage from "@/components/Image/index";
import { IPet } from "@/types/pet";
import { Box } from "@mui/material";

interface ViewPetMobileProps{
    pet: IPet
}

const ViewPetMobile = (props: ViewPetMobileProps) => {
    const { pet } = props;
    return(
        <Box p={2}>
            <CommonImage
                src={pet.urlAvatar}
                sx={{ 
                    borderRadius: 5,
                    height: 250,
                    boxShadow: '2px 2px 5px rgba(0,0,0,0.3), 2px 2px 5px rgba(0,0,0,0.3)',
                    position: 'relative'
                }}
            />
            <CommonImage
                sx={{
                    position: 'absolute'
                }}
            />
        </Box>
    )
}

export default ViewPetMobile;
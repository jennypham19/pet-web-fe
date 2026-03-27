import { IPet } from "@/types/pet";
import { Box } from "@mui/material";

interface ViewPetMobileProps{
    pet: IPet
}

const ViewPetMobile = (props: ViewPetMobileProps) => {
    const { pet } = props;
    return(
        <Box></Box>
    )
}

export default ViewPetMobile;
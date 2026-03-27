import { IPet } from "@/types/pet";
import { Box } from "@mui/material";

interface ViewPetDesktopProps{
    pet: IPet
}

const ViewPetDesktop = (props: ViewPetDesktopProps) => {
    const { pet } = props;
    return(
        <Box></Box>
    )
}

export default ViewPetDesktop;
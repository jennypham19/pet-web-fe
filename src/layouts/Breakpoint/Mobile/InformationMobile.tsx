import { IUser } from "@/types/user";
import { Box } from "@mui/material";

interface InformationMobileProps{
    profile: IUser
}

const InformationMobile = (props: InformationMobileProps) => {
    const { profile } = props;
    return(
        <Box></Box>
    )
}
export default InformationMobile;
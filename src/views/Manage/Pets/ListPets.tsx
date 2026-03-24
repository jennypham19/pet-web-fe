import NavigateBack from "@/views/components/NavigateBack";
import { Box } from "@mui/material";

interface ListPetsProps{
    onBack: () => void;
}

const ListPets = (props: ListPetsProps) => {
    const { onBack } = props;
    return(
        <Box>
            <NavigateBack
                title="Danh sách thú cưng"
                onBack={onBack}
                sx={{ p: 1, bgcolor: '#fff' }}
            />
        </Box>
    )
}

export default ListPets;
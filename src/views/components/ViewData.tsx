import IconButton from "@/components/IconButton/IconButton";
import { ArrowForward } from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

interface ViewDataProps{
    label: string,
    onClick: () => void;
}

const ViewData = (props: ViewDataProps) => {
    const { label, onClick } = props;
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Box display='flex' justifyContent='space-between'>
            <Typography variant="h6" fontWeight={500}>{label}</Typography>
            {md ? (
                <IconButton
                    handleFunt={onClick}
                    icon={<ArrowForward/>}
                    title="Xem thêm"
                />
            ) : (
                <Stack onClick={onClick} sx={{ cursor: 'pointer'}} direction='row'>
                    <Typography variant="caption" fontWeight={500}>Xem thêm</Typography>
                    <ArrowForward/>
                </Stack>
            )}
        </Box>
    )
}

export default ViewData;
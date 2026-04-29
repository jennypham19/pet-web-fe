import ViewData from "@/views/components/ViewData";
import { Avatar, Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CardData from "@/views/components/CardData";
import { getGenderPetLabel, getSpeciesPetLabel, getTypePetLabel } from "@/utils/labelEntoVni";
import { IPet } from "@/types/pet";
import { COLORS } from "@/constants/colors";

interface ListPetsInDashboardProps{
    onClick: () => void;
    label?: string,
    onDetailPet: (id: string) => void;
    listData: IPet[],
    isShowButton?: boolean
}

const ListPetsInDashboard = (props: ListPetsInDashboardProps) => {
    const { label = "Danh sách thú cưng", onClick, onDetailPet, listData, isShowButton = true } = props;
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const petsList = md ? listData.slice(0,1) : listData.slice(0,4)
    return(
        <Box p={2}>
            <ViewData
                label={label}
                onClick={onClick}
            />
            <Grid sx={{ mt: 1 }} container spacing={2}>
                {petsList.map((pet, idx) => (
                    <Grid key={idx} size={{ xs: 12, md: 3 }}>
                        <CardData>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <Avatar
                                    src={pet.urlAvatar}
                                    sx={{ borderRadius: '50%', width: 100, height: 100 }}
                                />
                                <Typography mt={0.5} variant="subtitle2" fontWeight={500}>{pet.name}</Typography>
                                <Box mt={2}>
                                    <Stack>
                                        <Typography variant="subtitle2">Động vật: </Typography>
                                        <Typography variant="subtitle2" fontWeight={500}>{getTypePetLabel(pet.type)} </Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography variant="subtitle2">Giống: </Typography>
                                        <Typography variant="subtitle2" fontWeight={500}>{getGenderPetLabel(pet.sex)} </Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography variant="subtitle2">Loài: </Typography>
                                        <Typography variant="subtitle2" fontWeight={500}>{getSpeciesPetLabel(pet.species)} </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                            {isShowButton && (
                                <Button
                                    onClick={() => onDetailPet(pet.id)}
                                    fullWidth
                                    sx={{ mt: 1, borderRadius: 2, bgcolor: COLORS.PRIMARY }}
                                >
                                    Xem chi tiết
                                </Button>
                            )}
                        </CardData>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ListPetsInDashboard;
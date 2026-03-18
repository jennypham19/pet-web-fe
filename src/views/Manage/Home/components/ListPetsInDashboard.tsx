import ViewData from "@/views/components/ViewData";
import { Avatar, Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import dog from "@/assets/images/users/dog.png"
import CardData from "@/views/components/CardData";
import { getGenderPetLabel, getSpeciesPetLabel, getTypePetLabel } from "@/utils/labelEntoVni";

const DATA_PETS = [
    {
        id: 1,
        image: dog,
        name: 'Milo',
        type: 'dog',
        sex: 'male',
        species: 'poodle'
    },
    {
        id: 2,
        image: dog,
        name: 'Milo',
        type: 'dog',
        sex: 'male',
        species: 'poodle'
    },
    {
        id: 3,
        image: dog,
        name: 'Milo',
        type: 'dog',
        sex: 'male',
        species: 'poodle'
    },
    {
        id: 4,
        image: dog,
        name: 'Milo',
        type: 'dog',
        sex: 'male',
        species: 'poodle'
    },
]

const ListPetsInDashboard = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    const petsList = md ? DATA_PETS.slice(0,1) : DATA_PETS.slice(0,4)
    return(
        <Box p={2}>
            <ViewData
                label="Danh sách thú cưng"
                onClick={() => { navigate('/pet/manage/pet')}}
            />
            <Grid sx={{ mt: 1 }} container spacing={2}>
                {petsList.map((pet, idx) => (
                    <Grid key={idx} size={{ xs: 12, md: 3 }}>
                        <CardData>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <Avatar
                                    src={pet.image}
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
                        </CardData>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ListPetsInDashboard;
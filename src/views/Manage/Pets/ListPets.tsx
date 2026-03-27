import CustomPagination from "@/components/Pagination/CustomPagination";
import { COLORS } from "@/constants/colors";
import { IPet } from "@/types/pet";
import { getGenderPetLabel, getSpeciesPetLabel, getTypePetLabel } from "@/utils/labelEntoVni";
import CardData from "@/views/components/CardData";
import NavigateBack from "@/views/components/NavigateBack";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import DetailPet from "./components/DetailPet";

interface ListPetsProps{
    onBack: () => void;
    page: number;
    rowsPerPage: number;
    total: number;
    onPageChange: (newPage: number) => void;
    listData: IPet[]
}

const ListPets = (props: ListPetsProps) => {
    const { onBack, page, rowsPerPage, total, onPageChange, listData } = props;
    const [openView, setOpenView] = useState(false);
    const [id, setId] = useState<string | null>(null)
    return(
        <Box>
            {!openView && (
                <>
                    <NavigateBack
                        title="Danh sách thú cưng"
                        onBack={onBack}
                        sx={{ p: 1, bgcolor: '#fff' }}
                    />
                    <Grid sx={{ mt: 1 }} container spacing={2}>
                        {listData.map((pet, idx) => (
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
                                    <Button
                                        onClick={() => { setOpenView(true); setId(pet.id)}}
                                        fullWidth
                                        sx={{ mt: 1, borderRadius: 2, bgcolor: COLORS.PRIMARY }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </CardData>
                            </Grid>
                        ))}

                        <CustomPagination
                            count={total}
                            onPageChange={onPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </Grid>                
                </>
            )}
            {openView && id && (
                <DetailPet
                    id={id}
                    onBack={() => { setOpenView(false); setId(null) }}
                />
            )}
        </Box>
    )
}

export default ListPets;
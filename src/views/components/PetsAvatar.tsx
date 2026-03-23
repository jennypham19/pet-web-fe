import { Avatar, Box, Tooltip, Typography, IconButton as IconButtonMui } from "@mui/material";

const PetsAvatar = ({ pets, width = 40, height = 40 }: { pets: {name: string, sex: string, urlAvatar: string}[], width?: number, height?: number }) => {
  const maxShow = 3;
  const visible = pets.slice(0, maxShow);
  const remain = pets.length - maxShow;

  return (
    <Box display="flex" alignItems="center">
        {visible.map((pet, idx) => (
            <Tooltip key={idx} title={pet.name}>
                <Avatar src={pet.urlAvatar} sx={{ borderRadius: '50%', width: width, height: height, ml: idx === 0 ? 0 : -1, }} />
            </Tooltip>
        ))}
        <Tooltip title='Xem thêm'>
            <IconButtonMui
                sx={{
                    border: '1px solid #000',
                    borderRadius: '50%',
                    bgcolor: '#b4b0b0',
                    width: width,
                    height: height,
                    ml: -1
                }}
            >
                <Typography variant='subtitle2' fontWeight={500}>+{remain}</Typography>
            </IconButtonMui>
        </Tooltip>
    </Box>
  );
};

export default PetsAvatar;
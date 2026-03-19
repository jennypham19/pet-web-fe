import { NavigateBefore } from '@mui/icons-material';
import { Stack, SxProps, Typography } from '@mui/material';
import IconButton from '@/components/IconButton/IconButton';





interface NavigateBackProps {
  title: string;
  onBack: () => void;
  sx?: SxProps;
}

const NavigateBack = (props: NavigateBackProps) => {
  const { title, onBack, sx } = props;
  return (
    <Stack sx={sx}>
      <IconButton
        handleFunt={onBack}
        icon={<NavigateBefore sx={{ width: '28px', height: '28px' }} />}
      />
      <Typography pt={0.2} fontWeight={600} variant='h6'>
        {title}
      </Typography>
    </Stack>
  );
};

export default NavigateBack;
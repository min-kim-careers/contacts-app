import { Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface SimpleBackDropProps {
  openOn: boolean;
}

export default function SimpleBackdrop({
  openOn = false,
}: SimpleBackDropProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openOn}
      >
        <Stack spacing={2} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
          <Typography variant='h5'>
            Fetching contacts... Thank you for your patience.
          </Typography>
          <CircularProgress color='inherit' />
        </Stack>
      </Backdrop>
    </div>
  );
}

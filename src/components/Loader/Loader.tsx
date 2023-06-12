import { Backdrop, CircularProgress } from '@mui/material';
export const Loader = (props: { open: boolean }) => {
  return (
    <Backdrop
      sx={{ color: '#009EFB', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
import { useState, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Notification = ({ notification, ...props }) => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(true);
  const { message, severity, location } = notification;
  const { vertical, horizontal } = location || { vertical: 'top', horizontal: 'right' };
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
      key={vertical + horizontal}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Notification;

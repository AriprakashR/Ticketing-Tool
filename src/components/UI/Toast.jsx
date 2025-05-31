import { Snackbar, Alert } from "@mui/material";

const Toast = ({
  open,
  message,
  severity = "success",
  onClose,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="outlined"
        sx={{ width: "100%", borderRadius: 3 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

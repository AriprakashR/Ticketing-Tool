import { Snackbar, Alert, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";

const Toast = ({
  open,
  message,
  severity = "success",
  onClose,
  autoHideDuration = 3000,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getColors = (type) => {
    const dark = {
      success: {
        bg: "#213636",
        color: "#77ED8B",
        border: "#214D3C",
        iconColor: "#77ED8B",
      },
      error: {
        bg: "#322E33",
        color: "#FFAC82",
        border: "#533432",
        iconColor: "#FFAC82",
      },
      warning: {
        bg: "#32342F",
        color: "#FFD666",
        border: "#534627",
        iconColor: "#FFD666",
      },
      info: {
        bg: "#1E3540",
        color: "#61F3F3",
        border: "#194A58",
        iconColor: "#61F3F3",
      },
    };
    const light = {
      success: {
        bg: "#EAF6EF",
        color: "#118D6F",
        border: "#CAEFD8",
        iconColor: "#22C55E",
      },
      error: {
        bg: "#FBEEEC",
        color: "#B71D3A",
        border: "#ef9A9A",
        iconColor: "#FF5630",
      },
      warning: {
        bg: "#FBF4E8",
        color: "#BE6E00",
        border: "#FCE8C3",
        iconColor: "#FFAB00",
      },
      info: {
        bg: "#E7F5F9",
        color: "#006CA8",
        border: "#C2ECF4",
        iconColor: "#00B8D9",
      },
    };
    return isDark ? dark[type] : light[type];
  };

  const { bg, color, border, iconColor } = getColors(severity);

  const getIcon = (type, color) => {
    const icons = {
      success: "solar:check-circle-bold",
      error: "solar:danger-bold",
      warning: "solar:danger-triangle-bold",
      info: "solar:info-circle-bold",
    };
    return <Icon icon={icons[type]} fontSize={25} color={color} />;
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        icon={getIcon(severity, iconColor)}
        variant="outlined"
        sx={{
          width: "100%",
          bgcolor: bg,
          color: color,
          borderColor: border,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

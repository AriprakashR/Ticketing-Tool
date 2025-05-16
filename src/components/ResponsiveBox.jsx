import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const ResponsiveBox = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isPC = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isMonitor = useMediaQuery(theme.breakpoints.up("lg"));

  const getDevice = () => {
    if (isMobile) return "Mobile";
    if (isTablet) return "Tablet";
    if (isPC) return "PC/Desktop";
    if (isMonitor) return "Monitor";
    return "Unknown";
  };

  return (
    <>
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">Responsive Layout</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          You are viewing this on: <strong>{getDevice()}</strong>
        </Typography>
      </Box>
    </>
  );
};

export default ResponsiveBox;

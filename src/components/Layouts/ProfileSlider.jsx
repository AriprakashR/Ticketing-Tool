import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { postEmployeeLogout } from "../../api/auth-service";

const ProfileSlider = ({ open, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const iconColor = isDarkMode ? "#919EAB" : "#637381";
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const res = await postEmployeeLogout();
    if (res?.status === 200) {
      navigate("/");
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={300}
      BackdropProps={{
        sx: {
          backgroundColor: "transparent",
        },
      }}
      PaperProps={{
        sx: {
          width: 320,
          background: isDarkMode
            ? `
        radial-gradient(circle at top right, rgba(25, 50, 61, 0.35) 100px, transparent 160px),
        radial-gradient(circle at bottom left, rgba(44, 28, 26, 0.3) 80px, transparent 140px),
        #141A21
      `
            : `
        radial-gradient(circle at top right, rgba(230, 248, 251, 0.6) 100px, transparent 160px),
        radial-gradient(circle at bottom left, rgba(251, 233, 230, 0.5) 80px, transparent 140px),
        #FFFFFF
      `,
          backdropFilter: "blur(10px)", // <- blur effect
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.9), // dynamic transparency
          boxShadow: "none",
          border: "none",
          transition: "width 0.3s, margin 0.3s",
        },
      }}
    >
      <IconButton onClick={onClose} sx={{ position: "absolute", top: "12px", left: "12px" }}>
        <Icon icon="mingcute:close-line" color={iconColor} fontSize={20} />
      </IconButton>

      <Box display="flex" flexDirection="column" alignItems="center" paddingTop="64px">
        <Avatar sx={{ width: 84, height: 84, color: iconColor }}>CT</Avatar>
        <Typography variant="h6" marginTop="16px" color={iconColor}>
          John Doe
        </Typography>
        <Typography variant="body2" color={iconColor} marginTop="4px">
          johndoe@example.com
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" gap={1.5} padding="24px">
        <Avatar sx={{ width: 40, height: 40, textAlign: "center" }}>A</Avatar>
        <Avatar sx={{ width: 40, height: 40, textAlign: "center" }}>B</Avatar>
        <Avatar sx={{ width: 40, height: 40, textAlign: "center" }}>C</Avatar>
        <IconButton
          sx={{
            width: 37.6,
            height: 40,
            border: "1px dashed",
            borderColor: "rgba(145 158 171 / 20%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: iconColor,
          }}
        >
          <Icon icon="mingcute:add-line" fontSize={20} />
        </IconButton>
      </Box>

      <List
        sx={{
          borderTop: "dashed 1px",
          borderBottom: "dashed 1px",
          borderColor: "rgba(145 158 171 / 20%)",
          color: iconColor,
          paddingX: "20px",
          paddingY: "24px",
        }}
      >
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Security" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Account Settings" />
        </ListItem>
      </List>
      <Box sx={{ padding: "20px" }}>
        <Button
          fullWidth
          onClick={handleLogout}
          loading={loading}
          loadingPosition="start"
          sx={{
            height: "48px",
            fontWeight: 700,
            paddingX: "16px",
            paddingY: "8px",
            color: isDarkMode ? "#FFAC82" : "#B71D18",
            backgroundColor: "#FF563029",
            "&:hover": {
              backgroundColor: "#FF563052",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default ProfileSlider;

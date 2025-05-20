import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import AssignmentTwoToneIcon from "@mui/icons-material/AssignmentTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import BarChartTwoToneIcon from "@mui/icons-material/BarChartTwoTone";

export const drawerWidth = 300;
export const collapsedWidth = 88;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const theme = useTheme();
  const isMonitor = useMediaQuery(theme.breakpoints.up("lg"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const renderListItem = (IconComponent, label) => (
    <ListItem sx={{ display: "block", py: 0.25 }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          flexDirection: collapsed && isMonitor ? "column" : "row",
          justifyContent: collapsed && isMonitor ? "center" : "flex-start",
          transition: "all 0.3s ease",
          borderRadius: 1.5,
          mx: collapsed ? -1.5 : 0,
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1D242B" : "#F6F7F8",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "auto",
            display: "flex",
            mr: collapsed && isMonitor ? 0 : 1.5,
            mb: collapsed && isMonitor ? 0.5 : 0,
          }}
        >
          <IconComponent />
        </ListItemIcon>
        {collapsed && isMonitor ? (
          <Box
            component="span"
            sx={{
              fontSize: 10,
              fontWeight: 600,
              lineHeight: "16px",
              mt: 0.5,
              whiteSpace: "nowrap",
              textAlign: "center",
              color: "#637381",
            }}
          >
            {label}
          </Box>
        ) : (
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: 14,
              lineHeight: 1.57,
            }}
            sx={{
              opacity: collapsed && isMonitor ? 0 : 1,
              transform: collapsed && isMonitor ? "translateX(-10px)" : "none",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#919EAB" : "#637381",
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );

  const drawerContent = (
    <Box>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 1,
        }}
      >
        <Box
          component="img"
          src="/src/assets/ct-logo-bg-rmv.png"
          alt="Company Logo"
          sx={{
            height: 40,
            width: 50,
            ml: -0.7,
            mt: 3,
            mb: 1.8,
          }}
        />
        {isMonitor && (
          <IconButton
            onClick={handleCollapseToggle}
            sx={{
              position: "absolute",
              top: 10,
              right: -12.5, // Half outside
              transform: "translateY(-30%)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 0 0 0.5px rgba(255, 255, 255, 0.1)"
                  : "0 0 0 0.5px rgba(0, 0, 0, 0.1)",
              backgroundColor: "background.paper",
              top: "50%",
              zIndex: 2000,
              width: 25,
              height: 25,
              transition: "transform 0.3s ease, right 0.3s ease",
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#28323D" : "#F4F6F8",
              },
            }}
          >
            {collapsed ? (
              <ChevronRightIcon
                sx={{ fontSize: 20, transform: "scaleX(0.7)" }}
              />
            ) : (
              <ChevronLeftIcon
                sx={{ fontSize: 20, transform: "scaleX(0.7)" }}
              />
            )}
          </IconButton>
        )}
      </Toolbar>
      {/* Logo goes here */}

      <List>
        {renderListItem(DashboardTwoToneIcon, "App")}
        {renderListItem(AssignmentTwoToneIcon, "Ecommerce")}
        {renderListItem(BarChartTwoToneIcon, "Reports")}
        {renderListItem(PeopleTwoToneIcon, "Users")}
        {renderListItem(SettingsTwoToneIcon, "Settings")}
      </List>
    </Box>
  );

  const currentDrawerWidth = isMonitor
    ? collapsed
      ? collapsedWidth
      : drawerWidth
    : drawerWidth;
  return (
    <>
      {!isMonitor && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1301,
            color: "inherit",
          }}
        >
          <ClearAllRoundedIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMonitor ? "permanent" : "temporary"}
        open={isMonitor ? true : mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: currentDrawerWidth,
          flexShrink: 0,
          zIndex: isMonitor ? 1200 : 1600,
          "& .MuiDrawer-paper": {
            width: currentDrawerWidth,
            border: "none",
            overflowY: "visible",
            transition: theme.transitions.create(["width", "box-shadow"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.complex,
            }),
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 0 0 0.5px rgba(255, 255, 255, 0.1)"
                : "0 0 0 0.5px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;

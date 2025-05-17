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
    <ListItem sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          flexDirection: collapsed && isMonitor ? "column" : "row",
          justifyContent: collapsed && isMonitor ? "center" : "flex-start",
          transition: "all 0.3s ease",
          borderRadius: 1.5,
          mx: -0.5,
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
          <Box component="span" sx={{ fontSize: 10, mt: 0.5 }}>
            {label}
          </Box>
        ) : (
          <ListItemText
            primary={label}
            sx={{
              opacity: collapsed && isMonitor ? 0 : 1,
              transform: collapsed && isMonitor ? "translateX(-10px)" : "none",
              transition: "opacity 0.3s ease, transform 0.3s ease",
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
          justifyContent: collapsed && isMonitor ? "center" : "flex-end",
          px: 1,
        }}
      >
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
      <Divider />
      <List>
        {renderListItem(DashboardTwoToneIcon, "Dashboard")}
        {renderListItem(AssignmentTwoToneIcon, "Form Page")}
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

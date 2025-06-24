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
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

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

  const SIDEBAR_LINKS = [
    { id: 1, icon: "solar:widget-4-bold-duotone", label: "Dashboard", path: "/dashboard" },
    { id: 2, icon: "solar:users-group-rounded-bold-duotone", label: "Customer", path: "/customers" },
    { id: 3, icon: "solar:user-speak-rounded-bold-duotone", label: "Employee", path: "/employees" },
    { id: 4, icon: "solar:bag-smile-bold-duotone", label: "Product", path: "/products" },
    { id: 5, icon: "solar:washing-machine-bold-duotone", label: "Machine", path: "/machines" },
    { id: 6, icon: "solar:chart-2-bold-duotone", label: "Reports", path: "/reports" },
    { id: 7, icon: "solar:settings-bold-duotone", label: "Settings", path: "/settings" },
  ];

  const renderListItem = (id, icon, label, path) => {
    return (
      <ListItem sx={{ display: "block", py: 0.25 }}>
        <NavLink to={path} style={{ textDecoration: "none", color: "inherit" }}>
          {({ isActive }) => {
            const isDarkMode = theme.palette.mode === "dark";
            const activeColor = isDarkMode ? "#6BB1F8" : "#0C68E9";
            const defaultColor = isDarkMode ? "#919EAB" : "#637381";
            const activeBg = isDarkMode ? "#132030" : "#E2EBF7";
            const activeHoverBg = isDarkMode ? "#132741" : "#CFDFF5";
            const inactiveHoverBg = isDarkMode ? "#1D242B" : "#F6F7F8";

            return (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  flexDirection: collapsed && isMonitor ? "column" : "row",
                  justifyContent: collapsed && isMonitor ? "center" : "flex-start",
                  transition: "all 0.3s ease",
                  borderRadius: 1.5,
                  mx: collapsed ? -1.5 : 0,
                  backgroundColor: isActive ? activeBg : "transparent",
                  "&:hover": {
                    backgroundColor: isActive ? activeHoverBg : inactiveHoverBg,
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
                  <Icon icon={icon} width={20} height={20} color={isActive ? activeColor : defaultColor} />
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
                      color: isActive ? activeColor : defaultColor,
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
                      color: isActive ? activeColor : defaultColor,
                    }}
                  />
                )}
              </ListItemButton>
            );
          }}
        </NavLink>
      </ListItem>
    );
  };

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
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#28323D" : "#F4F6F8"),
              },
            }}
          >
            {collapsed ? (
              <ChevronRightIcon sx={{ fontSize: 20, transform: "scaleX(0.7)" }} />
            ) : (
              <ChevronLeftIcon sx={{ fontSize: 20, transform: "scaleX(0.7)" }} />
            )}
          </IconButton>
        )}
      </Toolbar>
      {/* Logo goes here */}

      <List>{SIDEBAR_LINKS.map(({ id, icon, label, path }) => renderListItem(id, icon, label, path))}</List>
    </Box>
  );

  const currentDrawerWidth = isMonitor ? (collapsed ? collapsedWidth : drawerWidth) : drawerWidth;
  return (
    <>
      {!isMonitor && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 1301,
            color: "inherit",
          }}
        >
          <Icon
            icon="solar:list-bold-duotone"
            strokeWidth={1}
            stroke="currentColor"
            color={theme.palette.mode === "dark" ? "#919EAB" : "#637381"}
          />
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
              theme.palette.mode === "dark" ? "0 0 0 0.5px rgba(255, 255, 255, 0.1)" : "0 0 0 0.5px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;

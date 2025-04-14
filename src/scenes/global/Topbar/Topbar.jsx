import React, { useContext } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  alpha,
  hexToRgb,
} from "@mui/material";
import {
  LightModeOutlined as LightModeOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  RedeemOutlined as RedeemOutlined,
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "theme";
import "./Topbar.css";
import { useLocation } from "react-router-dom";

const Topbar = ({}) => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const scaleOnActive = "1.25";

  // Shadow color based on theme
  const shadowColor =
    theme.palette.mode === "dark"
      ? alpha(colors.primary[200], 0.175)
      : alpha(colors.primary[300], 0.175);

  // Check if the route is active
  const isActiveRoute = (route) => location.pathname === route;

  // Menu hover handlers
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.25)";
    e.currentTarget.style.fontWeight = "900";
    e.currentTarget.style.transition = "all 0.2s ease-in-out";
  };

  const handleMouseLeave = (e, route) => {
    if (!isActiveRoute(route)) {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.fontWeight = "400";
      e.currentTarget.style.transition = "all 0.2s ease-in-out";
    }
  };

  // Menu items
  const menuItems = [
    { href: "/", icon: <RedeemOutlined />, label: "Dárek s hádankou" },
  ];

  return (
    <Box
      className="topbar"
      sx={{
        borderBottom: `1px solid ${
          theme.palette.mode === "dark"
            ? `rgba(${hexToRgb(colors.primary[100])}, 1)`
            : `rgba(${hexToRgb(colors.primary[300])}, 0.5)`
        }`,
        backgroundColor: theme.palette.background.default,
        boxShadow: `0 0.225rem 0.25rem ${shadowColor}`,
        fontSize: theme.typography.menu?.fontSize || "1rem",
      }}
    >
      {/* MENU */}
      <Box className="menu">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              color: colors.grey[100],
              fontWeight: isActiveRoute(item.href) ? 900 : 400,
              transform: isActiveRoute(item.href)
                ? `scale(${scaleOnActive})`
                : "scale(1)",
              transition: "transform 0.2s ease-in-out",
            }}
            className="menuItem"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={(e) => handleMouseLeave(e, item.href)}
          >
            {item.icon}
            <Typography variant="inherit">{item.label}</Typography>
          </a>
        ))}
      </Box>
      {/* ICONS */}
      <Box className="icon-container">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(Topbar);

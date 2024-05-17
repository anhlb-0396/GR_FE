import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";

import {
  Menu as MenuIcon,
  TravelExplore as TravelExploreIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useSocket } from "../../../contexts/SocketContext";
import Notification from "../../../features/notifications/Notification";
import UserMenuHeader from "../../sharedComponents/UserMenuHeader";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { currentUser, isAuthenticated, handleLogout } = useAuth();
  const [isNotificationOpen, setNotificationOpen] = React.useState(false);
  const { notifications, handleReadAllNotifications } = useSocket();

  const pages = [];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleNotificationMenu = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TravelExploreIcon
            sx={{ display: { xs: "none", md: "flex", color: "white" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            JOBFIND
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="white"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", color: "white" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.link}
                    textAlign="center"
                    sx={{ color: "text.primary", textDecoration: "none" }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <TravelExploreIcon
            sx={{ display: { xs: "flex", md: "none", color: "white" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            JOBFIND
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.link}
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {isAuthenticated && (
            <UserMenuHeader
              toggleNotificationMenu={toggleNotificationMenu}
              handleLogout={handleLogout}
              notifications={notifications}
              currentUser={currentUser}
            />
          )}

          {!isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ my: 2, color: "white" }}
              >
                Đăng nhập
              </Button>

              <Button
                component={Link}
                to="/signup"
                color="inherit"
                sx={{ my: 2, color: "white" }}
              >
                Đăng kí
              </Button>
            </Box>
          )}
        </Toolbar>
        {isAuthenticated && (
          <Box>
            <Notification
              isOpen={isNotificationOpen}
              onClose={toggleNotificationMenu}
              notifications={notifications}
              handleReadAllNotifications={handleReadAllNotifications}
            />
          </Box>
        )}
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

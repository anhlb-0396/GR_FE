import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const pages = [
  { title: "Tạo CV", link: "/users/cv/create" },
  { title: "Xem CV", link: "/users/cv" },
  { title: "Tìm việc làm", link: "/" },
  { title: "Đánh giá", link: "/" },
];
const settings = ["Profile", "Account", "Dashboard"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { currentUser, isAuthenticated, handleLogout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            <Box display="flex">
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <IconButton sx={{ p: 0, mr: 5 }} size="medium">
                  <Badge badgeContent={4} color="error">
                    <MarkChatUnreadIcon />
                  </Badge>
                </IconButton>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <IconButton sx={{ p: 0, mr: 5 }} size="medium">
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}

                  <MenuItem key={"logout"} onClick={handleLogout}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
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
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

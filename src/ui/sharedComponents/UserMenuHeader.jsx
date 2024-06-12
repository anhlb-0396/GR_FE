import * as React from "react";
import { Link } from "react-router-dom";
import {
  Notifications as NotificationsIcon,
  MarkChatUnread as MarkChatUnreadIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Badge,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

function UserMenuHeader({
  toggleNotificationMenu,
  notifications,
  handleLogout,
  currentUser,
}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = [
    {
      label: "Quản lý",
      to: `${
        currentUser && currentUser.role === "agent"
          ? "/agent/applies"
          : "/user/home"
      }`,
    },
    { label: "Account", to: "/" },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box display="flex">
      {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <IconButton sx={{ p: 0, mr: 3 }} size="medium">
          <Badge badgeContent={4} color="error">
            <MarkChatUnreadIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Box> */}

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <IconButton
          color="inherit"
          sx={{ p: 0, mr: 3 }}
          onClick={toggleNotificationMenu}
        >
          {/* Use isNotificationOpen state to control the visibility of NotificationMenu */}
          <Badge badgeContent={notifications.length} color="secondary">
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
            <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
              <Button textAlign="center" component={Link} to={setting.to}>
                {setting.label}
              </Button>
            </MenuItem>
          ))}

          <MenuItem key="logout" onClick={handleLogout}>
            <Button textAlign="center">Đăng xuất</Button>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default UserMenuHeader;

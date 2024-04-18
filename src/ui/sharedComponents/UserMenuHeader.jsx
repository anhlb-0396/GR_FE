import * as React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

function UserMenuHeader({
  toggleNotificationMenu,
  notifications,
  handleLogout,
  currentUser,
}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = [
    { label: "Profile", to: "/" },
    { label: "Account", to: "/" },
    { label: "Job đã lưu", to: `users/${currentUser.id}/bookmarks` },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box display="flex">
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <IconButton sx={{ p: 0, mr: 3 }} size="medium">
          <Badge badgeContent={4} color="error">
            <MarkChatUnreadIcon />
          </Badge>
        </IconButton>
      </Box>

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

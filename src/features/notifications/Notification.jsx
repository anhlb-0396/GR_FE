import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TitleText from "../../ui/inputs/TitleText";
import { IconButton, Divider, Grid, Icon, Box } from "@mui/material";

const menuItemStyles = {
  whiteSpace: "normal",
  wordWrap: "break-word",
};

export default function Notification({
  isOpen,
  onClose,
  notifications,
  handleReadAllNotifications,
}) {
  return (
    <Menu
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorEl={null}
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          maxHeight: "300px",
          width: "500px",
          marginTop: "45px",
          borderRadius: "10px",
          overflow: "hidden",
          overflowY: "auto",
        },
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item xs={10} ml={5}>
          <TitleText variant="h5">Thông báo mới</TitleText>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleReadAllNotifications}>
            <Icon>delete</Icon>
          </IconButton>
        </Grid>
      </Grid>

      <Divider />
      {notifications?.map((notification, index) => (
        <Box key={notification.id}>
          <MenuItem onClick={onClose} sx={menuItemStyles}>
            {notification.message}
          </MenuItem>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
      {notifications.length === 0 && (
        <MenuItem disabled>Không có thông báo mới</MenuItem>
      )}
    </Menu>
  );
}

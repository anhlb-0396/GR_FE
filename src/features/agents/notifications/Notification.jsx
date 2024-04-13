import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TitleText from "../../../ui/inputs/TitleText";
import { Divider } from "@mui/material";

export default function Notification({ isOpen, onClose, notifications }) {
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
      <TitleText variant="h5">Thông báo mới</TitleText>
      <Divider sx={{ mt: 1 }} />
      {notifications?.map((notification) => (
        <MenuItem key={notification.id} onClick={onClose}>
          {notification.message}
        </MenuItem>
      ))}
      {notifications.length === 0 && (
        <MenuItem disabled>Không có thông báo mới</MenuItem>
      )}
    </Menu>
  );
}

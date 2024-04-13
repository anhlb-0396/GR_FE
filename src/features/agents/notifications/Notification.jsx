import React, { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

const notifications = ["New message from John Doe", "New job offer"];

const Notification = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open notifications">
        <IconButton onClick={handleToggle} sx={{ p: 0 }}>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      {open && (
        <List sx={{ mt: "45px", maxHeight: 200, overflowY: "auto" }}>
          {notifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText primary={notification} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Notification;

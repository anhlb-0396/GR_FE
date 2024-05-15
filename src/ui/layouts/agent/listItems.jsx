import * as React from "react";
import { Link } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import {
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Layers as LayersIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  ChatBubble as ChatBubbleIcon,
  AccountBox as AccountBoxIcon,
} from "@mui/icons-material";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="agent/company">
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Doanh nghiệp" />
    </ListItemButton>

    <ListItemButton component={Link} to="agent/jobs">
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý công việc" />
    </ListItemButton>

    <ListItemButton component={Link} to="agent/applies">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý ứng tuyển" />
    </ListItemButton>

    <ListItemButton component={Link} to="agent/statistics">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Thống kê" />
    </ListItemButton>

    <ListItemButton component={Link} to="agent/chats">
      <ListItemIcon>
        <ChatBubbleIcon />
      </ListItemIcon>
      <ListItemText primary="Tin nhắn" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Chức năng
    </ListSubheader>

    <ListItemButton component={Link} to="agent/notifications">
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Thông báo" />
    </ListItemButton>

    <ListItemButton component={Link} to="agent/profiles">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Thông tin cá nhân" />
    </ListItemButton>
  </React.Fragment>
);

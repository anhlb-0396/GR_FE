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
  Logout,
  ChatBubble as ChatBubbleIcon,
  AccountBox as AccountBoxIcon,
  Home as HomeIcon,
  ContactPage as ContactPageIcon,
  BookmarkAdded as BookmarkAddedIcon,
} from "@mui/icons-material";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="user/home">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Homepage" />
    </ListItemButton>

    <ListItemButton component={Link} to="user/companies">
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Doanh nghiệp" />
    </ListItemButton>

    <ListItemButton component={Link} to="user/jobs/bookmarks">
      <ListItemIcon>
        <BookmarkAddedIcon />
      </ListItemIcon>
      <ListItemText primary="Công việc đã lưu" />
    </ListItemButton>

    <ListItemButton component={Link} to="/user/jobs/expectations">
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Nguyện vọng" />
    </ListItemButton>

    <ListItemButton component={Link} to="user/applies">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý ứng tuyển" />
    </ListItemButton>

    <ListItemButton component={Link} to="user/dashboard">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Thống kê" />
    </ListItemButton>

    <ListItemButton component={Link} to="user/cv">
      <ListItemIcon>
        <ContactPageIcon />
      </ListItemIcon>
      <ListItemText primary="CV của tôi" />
    </ListItemButton>

    <ListItemButton component={Link} to="user/chats">
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

    <ListItemButton component={Link} to="user/notifications">
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Thông báo" />
    </ListItemButton>

    <ListItemButton component={Link} to="user/profiles">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Thông tin cá nhân" />
    </ListItemButton>
  </React.Fragment>
);

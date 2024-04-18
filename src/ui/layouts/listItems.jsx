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
} from "@mui/icons-material";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
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

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Thống kê" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Ứng viên tiềm năng" />
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

    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Đăng xuất" />
    </ListItemButton>
  </React.Fragment>
);

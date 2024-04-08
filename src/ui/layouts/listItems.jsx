import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Doanh nghiệp" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý công việc" />
    </ListItemButton>

    <ListItemButton>
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

    <ListItemButton>
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
